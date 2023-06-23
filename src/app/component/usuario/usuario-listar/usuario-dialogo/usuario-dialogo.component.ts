import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-usuario-dialogo',
  templateUrl: './usuario-dialogo.component.html',
  styleUrls: ['./usuario-dialogo.component.css']
})
export class UsuarioDialogoComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private uS: UsuarioService, private dialogRef: MatDialogRef<UsuarioDialogoComponent>) { }

  confirmar(estado: boolean) {
    this.uS.setConfirmDelete(estado)
    this.dialogRef.close()
  }

}
