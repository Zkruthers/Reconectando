import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PublicacionComentarioDTO } from 'src/app/model/publicacioncomentariodto';
import { ComentarioService } from 'src/app/service/comentario.service';

@Component({
  selector: 'app-reporte04',
  templateUrl: './reporte04.component.html',
  styleUrls: ['./reporte04.component.css']
})
export class Reporte04Component implements OnInit {

  comentarioCounts: PublicacionComentarioDTO[] = []

  dataSource: MatTableDataSource<PublicacionComentarioDTO> = new MatTableDataSource()
  displayedColumns: string[] = ['publicacion', 'cantidad']

  constructor(private cS: ComentarioService) { }

  ngOnInit(): void {

    this.cS.getComentarioCountByPublicacion().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

  }

  getComentarioCountByPublicacion(): void {

    this.cS.getComentarioCountByPublicacion().subscribe((data: PublicacionComentarioDTO[]) => {
      this.comentarioCounts = data
    })

  }

}
