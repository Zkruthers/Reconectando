import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DistritoPeopleDTO } from 'src/app/model/distritopeopledto';
import { PeopleService } from 'src/app/service/people.service';

@Component({
  selector: 'app-reporte01',
  templateUrl: './reporte01.component.html',
  styleUrls: ['./reporte01.component.css']
})
export class Reporte01Component implements OnInit {

  peopleCounts: DistritoPeopleDTO[] = []

  dataSource: MatTableDataSource<DistritoPeopleDTO> = new MatTableDataSource()
  displayedColumns: string[] = ['distrito', 'cantidad']

  constructor(private pS: PeopleService) { }

  ngOnInit(): void {

    this.pS.getPeopleCountByDistrito().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

  }

  getPeopleCountByDistrito(): void {
    this.pS.getPeopleCountByDistrito().subscribe((data: DistritoPeopleDTO[]) => {
      this.peopleCounts = data
    })
  }
}
