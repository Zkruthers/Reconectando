import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ComisariaService } from 'src/app/service/comisaria.service';

@Component({
  selector: 'app-comisaria-dialogo',
  templateUrl: './comisaria-dialogo.component.html',
  styleUrls: ['./comisaria-dialogo.component.css']
})
export class ComisariaDialogoComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private cS: ComisariaService, private dialogRef: MatDialogRef<ComisariaDialogoComponent>) { }

  confirmar(estado: boolean) {
    this.cS.setConfirmDelete(estado)
    this.dialogRef.close()
  }

}
