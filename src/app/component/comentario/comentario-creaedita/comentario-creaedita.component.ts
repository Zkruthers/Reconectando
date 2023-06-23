import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Comentario } from 'src/app/model/comentario';

import * as moment from 'moment'
import { ComentarioService } from 'src/app/service/comentario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { Publicacion } from 'src/app/model/publicacion';
import { UsuarioService } from 'src/app/service/usuario.service';
import { PublicacionService } from 'src/app/service/publicacion.service';


@Component({
  selector: 'app-comentario-creaedita',
  templateUrl: './comentario-creaedita.component.html',
  styleUrls: ['./comentario-creaedita.component.css'],
})
export class ComentarioCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  comentario: Comentario = new Comentario()

  maxFecha: Date = moment().add(0, 'days').toDate()

  listaUsuario: Usuario[] = []
  idUsuarioSeleccionada: number = 0

  listaPublicacion: Publicacion[] = []
  idPublicacionSeleccionada: number = 0

  today: Date = new Date()

  constructor(private cS: ComentarioService, private router: Router, private uS: UsuarioService, private pS: PublicacionService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      descripcionComentario: new FormControl(),
      fechaPublicacionC: new FormControl(),
      user: new FormControl(),
      publicacion: new FormControl()
    })

    this.uS.list().subscribe(data => {
      this.listaUsuario = data
    })

    this.pS.list().subscribe(data => {
      this.listaPublicacion = data
    })

    this.route.params.subscribe((data: Params) => {
      this.idComentario = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {

    this.comentario.idComentario = this.form.value['id']
    this.comentario.descripcionComentario = this.form.value['descripcionComentario']
    this.comentario.fechaPublicacionC = this.form.value['fechaPublicacionC']
    this.comentario.user.id = this.form.value['user']
    this.comentario.publicacion.idPublicacion = this.form.value['publicacion']

    if (this.form.value['descripcionComentario'].length > 0 ||
      this.idUsuarioSeleccionada > 0 ||
      this.idPublicacionSeleccionada > 0) {

      if (this.edicion) {

        //actualizar

        this.cS.update(this.comentario).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })

      }
      else {

        let u = new Usuario()
        u.id = this.idUsuarioSeleccionada
        this.comentario.user = u

        let p = new Publicacion()
        p.idPublicacion = this.idPublicacionSeleccionada
        this.comentario.publicacion = p

        //registrar

        this.cS.insert(this.comentario).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })

      }

    }

    this.router.navigate(['/pages/comentarios'])

  }

  idComentario: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.cS.listId(this.idComentario).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idComentario),
          descripcionComentario: new FormControl(data.descripcionComentario),
          fechaPublicacionC: new FormControl(data.fechaPublicacionC),
          user: new FormControl(data.user.id),
          publicacion: new FormControl(data.publicacion.idPublicacion)
        })
      })

    }

  }

}
