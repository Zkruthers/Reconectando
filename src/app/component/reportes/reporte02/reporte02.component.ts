import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaPublicacionDTO } from 'src/app/model/categoriapublicaciondto';
import { PublicacionService } from 'src/app/service/publicacion.service';

@Component({
  selector: 'app-reporte02',
  templateUrl: './reporte02.component.html',
  styleUrls: ['./reporte02.component.css']
})
export class Reporte02Component implements OnInit {

  publicacionCounts: CategoriaPublicacionDTO[] = []

  dataSource: MatTableDataSource<CategoriaPublicacionDTO> = new MatTableDataSource()
  displayedColumns: string[] = ['categoria', 'cantidad']

  constructor(private pS: PublicacionService) { }

  ngOnInit(): void {
    this.pS.getPublicacionCountByCategoria().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  getPublicacionCountByCategoria(): void {
    this.pS.getPublicacionCountByCategoria().subscribe((data: CategoriaPublicacionDTO[]) => {
      this.publicacionCounts = data
    })
  }

}
