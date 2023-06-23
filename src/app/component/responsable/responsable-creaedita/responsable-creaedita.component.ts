import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Responsable } from 'src/app/model/responsable';
import { ResponsableService } from 'src/app/service/responsable.service';

@Component({
  selector: 'app-responsable-creaedita',
  templateUrl: './responsable-creaedita.component.html',
  styleUrls: ['./responsable-creaedita.component.css']
})
export class ResponsableCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  responsable: Responsable = new Responsable()

  constructor(private rS: ResponsableService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      nombresResponsable: new FormControl(),
      apellidosResponsable: new FormControl(),
      telefonoResponsable: new FormControl()
    })

    this.route.params.subscribe((data: Params) => {
      this.idResponsable = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {

    this.responsable.idResponsable = this.form.value['id']
    this.responsable.nombresResponsable = this.form.value['nombresResponsable']
    this.responsable.apellidosResponsable = this.form.value['apellidosResponsable']
    this.responsable.telefonoResponsable = this.form.value['telefonoResponsable']

    if (this.form.value['nombresResponsable'].length > 0 ) {

      if (this.edicion) {

        //actualizar

        this.rS.update(this.responsable).subscribe(() => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })

      }
      else {

        //registrar

        this.rS.insert(this.responsable).subscribe(data => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })

      }

    }

    this.router.navigate(['/pages/responsables'])

  }

  idResponsable: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.rS.listId(this.idResponsable).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idResponsable),
          nombresResponsable: new FormControl(data.nombresResponsable),
          apellidosResponsable: new FormControl(data.apellidosResponsable),
          telefonoResponsable: new FormControl(data.telefonoResponsable)
        })
      })

    }

  }

}
