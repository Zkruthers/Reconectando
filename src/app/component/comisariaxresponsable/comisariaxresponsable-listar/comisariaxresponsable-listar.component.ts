import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Comisariaxresponsable } from 'src/app/model/comisariaxresponsable';
import { ComisariaxresponsableService } from 'src/app/service/comisariaxresponsable.service';
import { ComisariaxresponsableDialogoComponent } from './comisariaxresponsable-dialogo/comisariaxresponsable-dialogo.component';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-comisariaxresponsable-listar',
  templateUrl: './comisariaxresponsable-listar.component.html',
  styleUrls: ['./comisariaxresponsable-listar.component.css']
})
export class ComisariaxresponsableListarComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {

    this.role = this.lS.showRole();

    console.log(this.role);

    this.crS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.crS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.crS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false
    })

  }

  dataSource: MatTableDataSource<Comisariaxresponsable> = new MatTableDataSource()
  displayedColumns: string[] = ['codigo', 'idComisaria', 'idResponsable', 'accion01', 'accion02']

  role: string = "";

  constructor(private crS: ComisariaxresponsableService, private dialog: MatDialog, private lS: LoginService) { }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim()
  }

  idMayor: number = 0

  confirm(id: number) {
    this.idMayor = id
    this.dialog.open(ComisariaxresponsableDialogoComponent)
  }

  eliminar(id: number) {
    this.crS.delete(id).subscribe(() => {
      this.crS.list().subscribe(data => {
        this.crS.setList(data)
      })
    })
  }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator

  }

}
