import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Comisaria } from 'src/app/model/comisarias';
import { ComisariaService } from 'src/app/service/comisaria.service';
import { ComisariaDialogoComponent } from './comisaria-dialogo/comisaria-dialogo.component';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-comisaria-listar',
  templateUrl: './comisaria-listar.component.html',
  styleUrls: ['./comisaria-listar.component.css']
})
export class ComisariaListarComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {

    this.role = this.lS.showRole();

    console.log(this.role);

    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.cS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false
    })

  }

  dataSource: MatTableDataSource<Comisaria> = new MatTableDataSource()
  displayedColumns: string[] = ['codigo', 'nombre', 'direccion', 'telefono', 'idDistrito', 'accion01', 'accion02', 'accion03']

  role: string = "";

  constructor(private cS: ComisariaService, private dialog: MatDialog, private lS: LoginService) { }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim()
  }

  idMayor: number = 0

  confirm(id: number) {
    this.idMayor = id
    this.dialog.open(ComisariaDialogoComponent)
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cS.list().subscribe(data => {
        this.cS.setList(data)
      })
    })
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator

  }

}
