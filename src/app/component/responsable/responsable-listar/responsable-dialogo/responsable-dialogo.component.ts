import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ResponsableService } from 'src/app/service/responsable.service';

@Component({
  selector: 'app-responsable-dialogo',
  templateUrl: './responsable-dialogo.component.html',
  styleUrls: ['./responsable-dialogo.component.css']
})
export class ResponsableDialogoComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private rS: ResponsableService, private dialogRef: MatDialogRef<ResponsableDialogoComponent>) { }

  confirmar(estado: boolean) {
    this.rS.setConfirmDelete(estado)
    this.dialogRef.close()
  }

}
