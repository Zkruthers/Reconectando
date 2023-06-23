import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Distrito } from 'src/app/model/distrito';
import { DistritoService } from 'src/app/service/distrito.service';
import { DistritoDialogoComponent } from './distrito-dialogo/distrito-dialogo.component';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-distrito-listar',
  templateUrl: './distrito-listar.component.html',
  styleUrls: ['./distrito-listar.component.css']
})
export class DistritoListarComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {

    this.role = this.lS.showRole();

    console.log(this.role);


    this.dS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.dS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.dS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false
    })

  }

  dataSource: MatTableDataSource<Distrito> = new MatTableDataSource()
  displayedColumns: string[] = ['codigo', 'nombre', 'idCiudad', 'accion01', 'accion02']

  role: string = "";

  constructor(private dS: DistritoService, private dialog: MatDialog, private lS: LoginService) { }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim()
  }

  idMayor: number = 0

  confirm(id: number) {
    this.idMayor = id
    this.dialog.open(DistritoDialogoComponent)
  }

  eliminar(id: number) {
    this.dS.delete(id).subscribe(() => {
      this.dS.list().subscribe(data => {
        this.dS.setList(data)
      })
    })
  }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator

  }

}
