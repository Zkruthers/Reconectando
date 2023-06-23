import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PeoplexcomisariaService } from 'src/app/service/peoplexcomisaria.service';

@Component({
  selector: 'app-peoplexcomisaria-dialogo',
  templateUrl: './peoplexcomisaria-dialogo.component.html',
  styleUrls: ['./peoplexcomisaria-dialogo.component.css']
})
export class PeoplexcomisariaDialogoComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private pcS: PeoplexcomisariaService, private dialogRef: MatDialogRef<PeoplexcomisariaDialogoComponent>) { }

  confirmar(estado: boolean) {
    this.pcS.setConfirmDelete(estado)
    this.dialogRef.close()
  }

}
