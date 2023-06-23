import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Publicacion } from 'src/app/model/publicacion';

import * as moment from 'moment'
import { Categoria } from 'src/app/model/categoria';
import { Usuario } from 'src/app/model/usuario';
import { People } from 'src/app/model/people';
import { PublicacionService } from 'src/app/service/publicacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { PeopleService } from 'src/app/service/people.service';

@Component({
  selector: 'app-publicacion-creaedita',
  templateUrl: './publicacion-creaedita.component.html',
  styleUrls: ['./publicacion-creaedita.component.css']
})
export class PublicacionCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  publicacion: Publicacion = new Publicacion()

  maxFecha: Date = moment().add(0, 'days').toDate()

  listaCategoria: Categoria[] = []
  idCategoriaSeleccionada: number = 0

  listaUsuario: Usuario[] = []
  idUsuarioSeleccionada: number = 0

  listaPeople: People[] = []
  idPeopleSeleccionada: number = 0

  today: Date = new Date()

  constructor(private puS: PublicacionService, private router: Router, private cS: CategoriaService, private uS: UsuarioService, private peS: PeopleService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      tituloPublicacion: new FormControl(),
      descripcionPublicacion: new FormControl(),
      fechaPublicacionP: new FormControl(),
      fechaDesaparicion: new FormControl(),
      vigentePublicacion: new FormControl(),
      categoria: new FormControl(),
      user: new FormControl(),
      people: new FormControl()
    })

    this.cS.list().subscribe(data => {
      this.listaCategoria = data
    })

    this.uS.list().subscribe(data => {
      this.listaUsuario = data
    })

    this.peS.list().subscribe(data => {
      this.listaPeople = data
    })

    this.route.params.subscribe((data: Params) => {
      this.idPublicacion = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {

    this.publicacion.idPublicacion = this.form.value['id']
    this.publicacion.tituloPublicacion = this.form.value['tituloPublicacion']
    this.publicacion.descripcionPublicacion = this.form.value['descripcionPublicacion']
    this.publicacion.fechaPublicacionP = this.form.value['fechaPublicacionP']
    this.publicacion.fechaDesaparicion = this.form.value['fechaDesaparicion']
    this.publicacion.vigentePublicacion = this.form.value['vigentePublicacion']
    this.publicacion.categoria.idCategoria = this.form.value['categoria']
    this.publicacion.user.id = this.form.value['user']
    this.publicacion.people.idPeople = this.form.value['people']

    if (this.form.value['tituloPublicacion'].length > 0 ||
      this.idCategoriaSeleccionada > 0 ||
      this.idUsuarioSeleccionada > 0 ||
      this.idPeopleSeleccionada > 0) {

      if (this.edicion) {

        //actualizar

        this.puS.update(this.publicacion).subscribe(() => {
          this.puS.list().subscribe(data => {
            this.puS.setList(data)
          })
        })

      }
      else {

        let c = new Categoria()
        c.idCategoria = this.idCategoriaSeleccionada
        this.publicacion.categoria = c

        let u = new Usuario()
        u.id = this.idUsuarioSeleccionada
        this.publicacion.user = u

        let p = new People()
        p.idPeople = this.idPeopleSeleccionada
        this.publicacion.people = p

        //registrar

        this.puS.insert(this.publicacion).subscribe(() => {
          this.puS.list().subscribe(data => {
            this.puS.setList(data)
          })
        })

      }

    }

    this.router.navigate(['/pages/publicaciones'])

  }

  idPublicacion: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.puS.listId(this.idPublicacion).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idPublicacion),
          tituloPublicacion: new FormControl(data.tituloPublicacion),
          descripcionPublicacion: new FormControl(data.descripcionPublicacion),
          fechaPublicacionP: new FormControl(data.fechaPublicacionP),
          fechaDesaparicion: new FormControl(data.fechaDesaparicion),
          vigentePublicacion: new FormControl(data.vigentePublicacion),
          categoria: new FormControl(data.categoria.idCategoria),
          user: new FormControl(data.user.id),
          people: new FormControl(data.people.idPeople)
        })
      })

    }

  }

}
