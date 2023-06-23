import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RolService } from 'src/app/service/rol.service';

@Component({
  selector: 'app-rol-dialogo',
  templateUrl: './rol-dialogo.component.html',
  styleUrls: ['./rol-dialogo.component.css']
})
export class RolDialogoComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private rS: RolService, private dialogRef: MatDialogRef<RolDialogoComponent>) { }

  confirmar(estado: boolean) {

    this.rS.setConfirmDelete(estado)
    this.dialogRef.close()

  }

}
