import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-dialogo',
  templateUrl: './categoria-dialogo.component.html',
  styleUrls: ['./categoria-dialogo.component.css']
})
export class CategoriaDialogoComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private cS: CategoriaService, private dialogRef: MatDialogRef<CategoriaDialogoComponent>) { }

  confirmar(estado: boolean){
    this.cS.setConfirmDelete(estado)
    this.dialogRef.close()
  }



}
