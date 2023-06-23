import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Comentario } from 'src/app/model/comentario';
import { ComentarioService } from 'src/app/service/comentario.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ComentarioDialogoComponent } from './comentario-dialogo/comentario-dialogo.component';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-comentario-listar',
  templateUrl: './comentario-listar.component.html',
  styleUrls: ['./comentario-listar.component.css'],
})
export class ComentarioListarComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {

    this.role = this.lS.showRole();

    console.log(this.role);

    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    });

    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    });

    this.cS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false
    })

  }

  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource()
  displayedColumns: string[] = ['codigo', 'descripcion', 'fechaPublicacionC', 'idUsuario', 'idPublicacion', 'accion01', 'accion02']


  role: string = "";

  constructor(private cS: ComentarioService, private dialog: MatDialog, private lS: LoginService) { }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim()
  }

  idMayor: number = 0

  confirm(id: number) {
    this.idMayor = id
    this.dialog.open(ComentarioDialogoComponent)
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
