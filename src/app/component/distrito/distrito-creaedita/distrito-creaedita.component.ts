import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ciudad } from 'src/app/model/ciudad';
import { Distrito } from 'src/app/model/distrito';
import { CiudadService } from 'src/app/service/ciudad.service';
import { DistritoService } from 'src/app/service/distrito.service';

@Component({
  selector: 'app-distrito-creaedita',
  templateUrl: './distrito-creaedita.component.html',
  styleUrls: ['./distrito-creaedita.component.css']
})
export class DistritoCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  distrito: Distrito = new Distrito()

  lista: Ciudad[] = []
  idCiudadSeleccionado: number = 0

  constructor(private dS: DistritoService, private router: Router, private cS: CiudadService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      nombreDistrito: new FormControl(),
      ciudad: new FormControl()
    })

    this.cS.list().subscribe(data => {
      this.lista = data
    })

    this.route.params.subscribe((data: Params) => {
      this.idDistrito = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {

    this.distrito.idDistrito = this.form.value['id']
    this.distrito.nombreDistrito = this.form.value['nombreDistrito']
    this.distrito.ciudad.idCiudad = this.form.value['ciudad']

    if (this.form.value['nombreDistrito'].length > 0 ||
      this.idCiudadSeleccionado > 0) {

      if (this.edicion) {

        //actualizar

        this.dS.update(this.distrito).subscribe(() => {
          this.dS.list().subscribe(data => {
            this.dS.setList(data)
          })
        })

      }
      else {

        let c = new Ciudad()
        c.idCiudad = this.idCiudadSeleccionado
        this.distrito.ciudad = c

        //registrar

        this.dS.insert(this.distrito).subscribe(() => {
          this.dS.list().subscribe(data => {
            this.dS.setList(data)
          })
        })

      }

    }

    this.router.navigate(['/pages/distritos'])

  }

  idDistrito: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.dS.listId(this.idDistrito).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idDistrito),
          nombreDistrito: new FormControl(data.nombreDistrito),
          ciudad: new FormControl(data.ciudad.idCiudad)
        })
      })

    }

  }

}
