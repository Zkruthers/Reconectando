import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/model/rol';
import { RolService } from 'src/app/service/rol.service';
import { RolDialogoComponent } from './rol-dialogo/rol-dialogo.component';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-rol-listar',
  templateUrl: './rol-listar.component.html',
  styleUrls: ['./rol-listar.component.css']
})
export class RolListarComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {

    this.role = this.lS.showRole();

    console.log(this.role);

    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.rS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false
    })

  }

  dataSource: MatTableDataSource<Rol> = new MatTableDataSource()
  displayedColumns: string[] = ['codigo', 'nombre', 'usuario', 'accion01', 'accion02']

  role: string = "";

  constructor(private rS: RolService, private dialog: MatDialog, private lS: LoginService) { }

  filtrar(e: any) {

    this.dataSource.filter = e.target.value.trim()

  }

  idMayor: number = 0

  confirm(id: number) {

    this.idMayor = id
    this.dialog.open(RolDialogoComponent)

  }

  eliminar(id: number) {

    this.rS.delete(id).subscribe(() => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data)
      })
    })

  }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator

  }

}
