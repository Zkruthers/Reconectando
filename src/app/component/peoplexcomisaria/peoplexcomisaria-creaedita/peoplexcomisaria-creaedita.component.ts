import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comisaria } from 'src/app/model/comisarias';
import { People } from 'src/app/model/people';
import { Peoplexcomisaria } from 'src/app/model/peoplexcomisaria';
import { ComisariaService } from 'src/app/service/comisaria.service';
import { PeopleService } from 'src/app/service/people.service';
import { PeoplexcomisariaService } from 'src/app/service/peoplexcomisaria.service';

@Component({
  selector: 'app-peoplexcomisaria-creaedita',
  templateUrl: './peoplexcomisaria-creaedita.component.html',
  styleUrls: ['./peoplexcomisaria-creaedita.component.css']
})
export class PeoplexcomisariaCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  peoplexcomisaria: Peoplexcomisaria = new Peoplexcomisaria()

  listaPeople: People[] = []
  idPeopleSeleccionado: number = 0

  listaComisaria: Comisaria[] = []
  idComisariaSeleccionado: number = 0

  constructor(private pcS: PeoplexcomisariaService, private router: Router, private pS: PeopleService, private cS: ComisariaService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      people: new FormControl(),
      comisaria: new FormControl()
    })

    this.pS.list().subscribe(data => {
      this.listaPeople = data
    })

    this.cS.list().subscribe(data => {
      this.listaComisaria = data
    })

    this.route.params.subscribe((data: Params) => {
      this.idPeoplexcomisaria = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {

    this.peoplexcomisaria.idPeoplexcomisaria = this.form.value['id']
    this.peoplexcomisaria.people.idPeople = this.form.value['people']
    this.peoplexcomisaria.comisaria.idComisaria = this.form.value['comisaria']

    if (this.idPeopleSeleccionado > 0 ||
      this.idComisariaSeleccionado > 0) {

      if (this.edicion) {

        //actualizar

        this.pcS.update(this.peoplexcomisaria).subscribe(() => {
          this.pcS.list().subscribe(data => {
            this.pcS.setList(data)
          })
        })

      }
      else {

        let p = new People()
        p.idPeople = this.idPeopleSeleccionado
        this.peoplexcomisaria.people = p

        let c = new Comisaria()
        c.idComisaria = this.idComisariaSeleccionado
        this.peoplexcomisaria.comisaria = c

        //registrar

        this.pcS.insert(this.peoplexcomisaria).subscribe(() => {
          this.pcS.list().subscribe(data => {
            this.pcS.setList(data)
          })
        })

      }

    }

    this.router.navigate(['/pages/peoplexcomisaria'])

  }

  idPeoplexcomisaria: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.pcS.listId(this.idPeoplexcomisaria).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idPeoplexcomisaria),
          people: new FormControl(data.people.idPeople),
          comisaria: new FormControl(data.comisaria.idComisaria)
        })
      })

    }

  }

}
