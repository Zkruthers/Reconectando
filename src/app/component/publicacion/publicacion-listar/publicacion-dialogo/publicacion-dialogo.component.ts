import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PublicacionService } from 'src/app/service/publicacion.service';

@Component({
  selector: 'app-publicacion-dialogo',
  templateUrl: './publicacion-dialogo.component.html',
  styleUrls: ['./publicacion-dialogo.component.css']
})
export class PublicacionDialogoComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private pS: PublicacionService, private dialogRef: MatDialogRef<PublicacionDialogoComponent>) { }

  confirmar(estado: boolean) {
    this.pS.setConfirmDelete(estado)
    this.dialogRef.close()
  }

}
