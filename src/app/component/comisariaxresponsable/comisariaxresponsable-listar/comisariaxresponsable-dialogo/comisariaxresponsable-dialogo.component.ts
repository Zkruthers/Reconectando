import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ComisariaxresponsableService } from 'src/app/service/comisariaxresponsable.service';

@Component({
  selector: 'app-comisariaxresponsable-dialogo',
  templateUrl: './comisariaxresponsable-dialogo.component.html',
  styleUrls: ['./comisariaxresponsable-dialogo.component.css']
})
export class ComisariaxresponsableDialogoComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private crS: ComisariaxresponsableService, private dialogRef: MatDialogRef<ComisariaxresponsableDialogoComponent>) { }

  confirmar(estado: boolean) {
    this.crS.setConfirmDelete(estado)
    this.dialogRef.close()
  }

}
