import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comisaria } from 'src/app/model/comisarias';
import { Distrito } from 'src/app/model/distrito';
import { ComisariaService } from 'src/app/service/comisaria.service';
import { DistritoService } from 'src/app/service/distrito.service';

@Component({
  selector: 'app-comisaria-creaedita',
  templateUrl: './comisaria-creaedita.component.html',
  styleUrls: ['./comisaria-creaedita.component.css']
})
export class ComisariaCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  comisaria: Comisaria = new Comisaria

  lista: Distrito[] = []
  idDistritoSeleccionado: number = 0

  constructor(private cS: ComisariaService, private router: Router, private dS: DistritoService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      nombreComisaria: new FormControl(),
      direccionComisaria: new FormControl(),
      telefonoComisaria: new FormControl(),
      distrito: new FormControl()
    })

    this.dS.list().subscribe(data => {
      this.lista = data
    })

    this.route.params.subscribe((data: Params) => {
      this.idComisaria = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {
    this.comisaria.idComisaria = this.form.value['id']
    this.comisaria.nombreComisaria = this.form.value['nombreComisaria']
    this.comisaria.direccionComisaria = this.form.value['direccionComisaria']
    this.comisaria.telefonoComisaria = this.form.value['telefonoComisaria']
    this.comisaria.distrito.idDistrito = this.form.value['distrito']

    if (this.form.value['nombreComisaria'].length > 0 ||
      this.idDistritoSeleccionado > 0) {

      if (this.edicion) {

        //actualizar

        this.cS.update(this.comisaria).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })

      }
      else {

        let d = new Distrito()
        d.idDistrito = this.idDistritoSeleccionado
        this.comisaria.distrito = d

        //registrar

        this.cS.insert(this.comisaria).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })

      }

    }

    this.router.navigate(['/pages/comisarias'])

  }

  idComisaria: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.cS.listId(this.idComisaria).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idComisaria),
          nombreComisaria: new FormControl(data.nombreComisaria),
          direccionComisaria: new FormControl(data.direccionComisaria),
          telefonoComisaria: new FormControl(data.telefonoComisaria),
          distrito: new FormControl(data.distrito.idDistrito)
        })
      })
    }

  }

}
