import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Peoplexcomisaria } from 'src/app/model/peoplexcomisaria';
import { PeoplexcomisariaService } from 'src/app/service/peoplexcomisaria.service';
import { PeoplexcomisariaDialogoComponent } from './peoplexcomisaria-dialogo/peoplexcomisaria-dialogo.component';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-peoplexcomisaria-listar',
  templateUrl: './peoplexcomisaria-listar.component.html',
  styleUrls: ['./peoplexcomisaria-listar.component.css']
})
export class PeoplexcomisariaListarComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {

    this.role = this.lS.showRole();

    console.log(this.role);

    this.pcS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.pcS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })

    this.pcS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false
    })

  }

  dataSource: MatTableDataSource<Peoplexcomisaria> = new MatTableDataSource()
  displayedColumns: string[] = ['codigo', 'idPeople', 'idComisaria', 'accion01', 'accion02']

  role: string = "";

  constructor(private pcS: PeoplexcomisariaService, private dialog: MatDialog, private lS: LoginService) { }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim()
  }

  idMayor: number = 0

  confirm(id: number) {
    this.idMayor = id
    this.dialog.open(PeoplexcomisariaDialogoComponent)
  }

  eliminar(id: number) {
    this.pcS.delete(id).subscribe(() => {
      this.pcS.list().subscribe(data => {
        this.pcS.setList(data)
      })
    })
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator

  }
}
