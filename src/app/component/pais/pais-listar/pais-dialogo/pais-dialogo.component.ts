import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PaisService } from 'src/app/service/pais.service';

@Component({
  selector: 'app-pais-dialogo',
  templateUrl: './pais-dialogo.component.html',
  styleUrls: ['./pais-dialogo.component.css']
})
export class PaisDialogoComponent implements OnInit{

  ngOnInit(): void {

  }

  constructor(private pS: PaisService, private dialogRef: MatDialogRef<PaisDialogoComponent>){}

  confirmar(estado: boolean){

    this.pS.setConfirmDelete(estado)
    this.dialogRef.close()

  }

}
