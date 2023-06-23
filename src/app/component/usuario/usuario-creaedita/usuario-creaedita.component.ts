import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router, Params } from '@angular/router'
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-creaedita',
  templateUrl: './usuario-creaedita.component.html',
  styleUrls: ['./usuario-creaedita.component.css']
})
export class UsuarioCreaeditaComponent implements OnInit {

  //Password con eye para visualizar texto y no
  hide = true

  form: FormGroup = new FormGroup({})
  usuario: Usuario = new Usuario()

  constructor(private uS: UsuarioService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      enabled: new FormControl(),
      nombresUsuario: new FormControl(),
      apellidosUsuario: new FormControl(),
      emailUsuario: new FormControl(),
      telefonoUsuario: new FormControl()
    })

    this.route.params.subscribe((data: Params) => {
      this.idUsuario = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {

    this.usuario.id = this.form.value['id']
    this.usuario.username = this.form.value['username']
    this.usuario.password = this.form.value['password']
    this.usuario.enabled = this.form.value['enabled']
    this.usuario.nombresUsuario = this.form.value['nombresUsuario']
    this.usuario.apellidosUsuario = this.form.value['apellidosUsuario']
    this.usuario.emailUsuario = this.form.value['emailUsuario']
    this.usuario.telefonoUsuario = this.form.value['telefonoUsuario']

    if (this.form.value['nombresUsuario'].length > 0) {

      if (this.edicion) {

        //actualizar

        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })

      }
      else {

        //registrar

        this.uS.insert(this.usuario).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })

      }

    }

    this.router.navigate(['/pages/usuarios'])

  }

  idUsuario: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.uS.listId(this.idUsuario).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          username: new FormControl(data.username),
          password: new FormControl(data.password),
          enabled: new FormControl(data.enabled),
          nombresUsuario: new FormControl(data.nombresUsuario),
          apellidosUsuario: new FormControl(data.apellidosUsuario),
          emailUsuario: new FormControl(data.emailUsuario),
          telefonoUsuario: new FormControl(data.telefonoUsuario)
        })
      })

    }

  }

}
