import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Pais } from 'src/app/model/pais';
import { PaisService } from 'src/app/service/pais.service';
import { PaisDialogoComponent } from './pais-dialogo/pais-dialogo.component';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-pais-listar',
  templateUrl: './pais-listar.component.html',
  styleUrls: ['./pais-listar.component.css']
})
export class PaisListarComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {

    this.role = this.lS.showRole();

    console.log(this.role);

    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.pS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.pS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false
    })

  }

  dataSource: MatTableDataSource<Pais> = new MatTableDataSource()
  displayedColumns: string[] = ['codigo', 'nombre', 'accion01', 'accion02']

  role: string = "";

  constructor(private pS: PaisService, private dialog: MatDialog, private lS: LoginService) { }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim()
  }

  idMayor: number = 0

  confirm(id: number) {

    this.idMayor = id
    this.dialog.open(PaisDialogoComponent)

  }

  eliminar(id: number) {

    this.pS.delete(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data)
      })
    })

  }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator

  }

}
