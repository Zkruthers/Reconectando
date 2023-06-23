import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rol } from 'src/app/model/rol';
import { Usuario } from 'src/app/model/usuario';
import { RolService } from 'src/app/service/rol.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-rol-creaedita',
  templateUrl: './rol-creaedita.component.html',
  styleUrls: ['./rol-creaedita.component.css']
})
export class RolCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  rol: Rol = new Rol()

  lista: Usuario[] = []
  idUsuarioSeleccionado: number = 0

  constructor(private rS: RolService, private uS: UsuarioService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      rol: new FormControl(),
      user: new FormControl()
    })

    this.uS.list().subscribe(data => {
      this.lista = data
    })

    this.route.params.subscribe((data: Params) => {
      this.idRol = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {

    this.rol.id = this.form.value['id']
    this.rol.rol = this.form.value['rol']
    this.rol.user.id = this.form.value['user']

    if (this.form.value['rol'].length > 0 ||
    this.idUsuarioSeleccionado > 0) {

      if (this.edicion) {

        //actualizar
        this.rS.update(this.rol).subscribe(() => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })

      }
      else {

        let u = new Usuario()
        u.id = this.idUsuarioSeleccionado
        this.rol.user = u

        //registrar

        this.rS.insert(this.rol).subscribe(() => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })

      }

      this.router.navigate(['/pages/roles'])

    }

  }

  idRol: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.rS.listId(this.idRol).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          rol: new FormControl(data.rol),
          user: new FormControl(data.user.id)
        })
      })

    }

  }

}
