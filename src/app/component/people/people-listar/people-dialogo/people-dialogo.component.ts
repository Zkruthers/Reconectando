import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PeopleService } from 'src/app/service/people.service';

@Component({
  selector: 'app-people-dialogo',
  templateUrl: './people-dialogo.component.html',
  styleUrls: ['./people-dialogo.component.css']
})
export class PeopleDialogoComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private pS: PeopleService, private dialogRef: MatDialogRef<PeopleDialogoComponent>) {

  }

  confirmar(estado: boolean) {
    this.pS.setConfirmDelete(estado)
    this.dialogRef.close()
  }

}
