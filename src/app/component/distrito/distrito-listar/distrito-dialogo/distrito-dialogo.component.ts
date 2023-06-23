import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DistritoService } from 'src/app/service/distrito.service';

@Component({
  selector: 'app-distrito-dialogo',
  templateUrl: './distrito-dialogo.component.html',
  styleUrls: ['./distrito-dialogo.component.css']
})
export class DistritoDialogoComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private dS: DistritoService, private dialogRef: MatDialogRef<DistritoDialogoComponent>) { }

  confirmar(estado: boolean) {
    this.dS.setConfirmDelete(estado)
    this.dialogRef.close()
  }

}
