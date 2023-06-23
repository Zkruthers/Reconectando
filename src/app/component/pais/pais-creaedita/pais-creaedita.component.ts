import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pais } from 'src/app/model/pais';
import { PaisService } from 'src/app/service/pais.service';

@Component({
  selector: 'app-pais-creaedita',
  templateUrl: './pais-creaedita.component.html',
  styleUrls: ['./pais-creaedita.component.css']
})
export class PaisCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  pais: Pais = new Pais()

  constructor(private pS: PaisService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      nombrePais: new FormControl()
    })

    this.route.params.subscribe((data: Params) => {
      this.idPais = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })

  }

  aceptar(): void {

    this.pais.idPais = this.form.value['id']
    this.pais.nombrePais = this.form.value['nombrePais']

    if (this.form.value['nombrePais'].length > 0) {

      if (this.edicion) {

        //actualizar
        this.pS.update(this.pais).subscribe(() => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data)
          })
        })

      }
      else {

        //registrar

        this.pS.insert(this.pais).subscribe(() => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data)
          })
        })

      }

      this.router.navigate(['/pages/paises'])

    }

  }

  idPais: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.pS.listId(this.idPais).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idPais),
          nombrePais: new FormControl(data.nombrePais)
        })
      })

    }

  }

}
