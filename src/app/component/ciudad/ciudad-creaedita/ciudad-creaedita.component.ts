import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ciudad } from 'src/app/model/ciudad';
import { Pais } from 'src/app/model/pais';
import { CiudadService } from 'src/app/service/ciudad.service';
import { PaisService } from 'src/app/service/pais.service';

@Component({
  selector: 'app-ciudad-creaedita',
  templateUrl: './ciudad-creaedita.component.html',
  styleUrls: ['./ciudad-creaedita.component.css']
})
export class CiudadCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  ciudad: Ciudad = new Ciudad()

  lista: Pais[] = []
  idPaisSeleccionado: number = 0

  constructor(private cS: CiudadService, private router: Router, private pS: PaisService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      nombreCiudad: new FormControl(),
      pais: new FormControl()
    })

    this.pS.list().subscribe(data => {
      this.lista = data
    })

    this.route.params.subscribe((data: Params) => {
      this.idCiudad = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {

    this.ciudad.idCiudad = this.form.value['id']
    this.ciudad.nombreCiudad = this.form.value['nombreCiudad']
    this.ciudad.pais.idPais = this.form.value['pais']

    if (this.form.value['nombreCiudad'].length > 0 ||
      this.idPaisSeleccionado > 0) {

      if (this.edicion) {

        //actualizar
        this.cS.update(this.ciudad).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })

      }
      else {

        let p = new Pais()
        p.idPais = this.idPaisSeleccionado
        this.ciudad.pais = p

        //registrar
        this.cS.insert(this.ciudad).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })

      }

    }

    this.router.navigate(['/pages/ciudades'])

  }

  idCiudad: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.cS.listId(this.idCiudad).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idCiudad),
          nombreCiudad: new FormControl(data.nombreCiudad),
          pais: new FormControl(data.pais.idPais)
        })
      })

    }

  }

}
