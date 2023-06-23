import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comisaria } from 'src/app/model/comisarias';
import { Comisariaxresponsable } from 'src/app/model/comisariaxresponsable';
import { Responsable } from 'src/app/model/responsable';
import { ComisariaService } from 'src/app/service/comisaria.service';
import { ComisariaxresponsableService } from 'src/app/service/comisariaxresponsable.service';
import { ResponsableService } from 'src/app/service/responsable.service';

@Component({
  selector: 'app-comisariaxresponsable-creaedita',
  templateUrl: './comisariaxresponsable-creaedita.component.html',
  styleUrls: ['./comisariaxresponsable-creaedita.component.css']
})
export class ComisariaxresponsableCreaeditaComponent implements OnInit{

  form: FormGroup = new FormGroup({})
  comisariaxresponsable: Comisariaxresponsable = new Comisariaxresponsable()

  listaComisaria: Comisaria[] = []
  idComisariaSeleccionado: number = 0

  listaResponsable: Responsable[] = []
  idResponsableSeleccionado: number = 0

  constructor(private crS: ComisariaxresponsableService, private router: Router, private cS: ComisariaService, private rS: ResponsableService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      comisaria: new FormControl(),
      responsable: new FormControl()
    })

    this.cS.list().subscribe(data => {
      this.listaComisaria = data
    })

    this.rS.list().subscribe(data => {
      this.listaResponsable = data
    })

    this.route.params.subscribe((data: Params) => {
      this.idComisariaxresponsable = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {

    this.comisariaxresponsable.idComisariaxresponsable = this.form.value['id']
    this.comisariaxresponsable.comisaria.idComisaria = this.form.value['comisaria']
    this.comisariaxresponsable.responsable.idResponsable = this.form.value['responsable']

    if (this.idComisariaSeleccionado > 0 ||
      this.idResponsableSeleccionado > 0) {

      if (this.edicion) {

        //actualizar

        this.crS.update(this.comisariaxresponsable).subscribe(() => {
          this.crS.list().subscribe(data => {
            this.crS.setList(data)
          })
        })

      }
      else {

        let c = new Comisaria()
        c.idComisaria = this.idComisariaSeleccionado
        this.comisariaxresponsable.comisaria = c

        let r = new Responsable()
        r.idResponsable = this.idResponsableSeleccionado
        this.comisariaxresponsable.responsable = r

        //registrar

        this.crS.insert(this.comisariaxresponsable).subscribe(() => {
          this.crS.list().subscribe(data => {
            this.crS.setList(data)
          })
        })

      }

    }

    this.router.navigate(['/pages/comisariaxresponsable'])

  }

  idComisariaxresponsable: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.crS.listId(this.idComisariaxresponsable).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idComisariaxresponsable),
          comisaria: new FormControl(data.comisaria.idComisaria),
          responsable: new FormControl(data.responsable.idResponsable)
        })
      })

    }

  }

}
