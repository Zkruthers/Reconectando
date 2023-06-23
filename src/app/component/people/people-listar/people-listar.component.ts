import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { People } from 'src/app/model/people';
import { PeopleService } from 'src/app/service/people.service';
import { PeopleDialogoComponent } from './people-dialogo/people-dialogo.component';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-people-listar',
  templateUrl: './people-listar.component.html',
  styleUrls: ['./people-listar.component.css']
})
export class PeopleListarComponent implements OnInit, AfterViewInit {

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

  dataSource: MatTableDataSource<People> = new MatTableDataSource();
  displayedColumns: string[] = ['codigo', 'nombres', 'apellidos', 'dni', 'edad', 'genero', 'idDistrito', 'accion01', 'accion02', 'accion03']

  role: string = "";

  constructor(private pS: PeopleService, private dialog: MatDialog, private lS: LoginService) { }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim()
  }

  idMayor: number = 0

  confirm(id: number) {
    this.idMayor = id
    this.dialog.open(PeopleDialogoComponent)
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data)
      })
    })
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator

  }

}
