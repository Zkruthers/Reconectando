import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ComisariaPeopleDTO } from 'src/app/model/comisariapeopledto';
import { PeoplexcomisariaService } from 'src/app/service/peoplexcomisaria.service';

@Component({
  selector: 'app-reporte03',
  templateUrl: './reporte03.component.html',
  styleUrls: ['./reporte03.component.css']
})
export class Reporte03Component implements OnInit {

  peopleCounts: ComisariaPeopleDTO[] = []

  dataSource: MatTableDataSource<ComisariaPeopleDTO> = new MatTableDataSource()
  displayedColumns: string[] = ['comisaria', 'cantidad']

  constructor(private pxcS: PeoplexcomisariaService) { }

  ngOnInit(): void {

    this.pxcS.getPeopleCountByComisaria().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

  }

  getPeopleCountByComisaria(): void {

    this.pxcS.getPeopleCountByComisaria().subscribe((data: ComisariaPeopleDTO[]) => {
      this.peopleCounts = data
    })

  }


}
