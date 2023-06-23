import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CiudadService } from 'src/app/service/ciudad.service';

@Component({
  selector: 'app-ciudad-dialogo',
  templateUrl: './ciudad-dialogo.component.html',
  styleUrls: ['./ciudad-dialogo.component.css']
})
export class CiudadDialogoComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private cS: CiudadService, private dialogRef: MatDialogRef<CiudadDialogoComponent>) { }

  confirmar(estado: boolean) {
    this.cS.setConfirmDelete(estado)
    this.dialogRef.close()
  }

}
