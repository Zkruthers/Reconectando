import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { CategoriaDialogoComponent } from './categoria-dialogo/categoria-dialogo.component';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit, AfterViewInit {

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

  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource()
  displayedColumns: string[] = ['codigo', 'nombre', 'rango', 'descripcion', 'accion01', 'accion02']

  role: string = "";

  constructor(private cS: CategoriaService, private dialog: MatDialog, private lS: LoginService) { }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim()
  }

  idMayor: number = 0

  confirm(id: number) {
    this.idMayor = id
    this.dialog.open(CategoriaDialogoComponent)
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cS.list().subscribe(data => {
        this.cS.setList(data)
      })
    })
  }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator

  }

}
