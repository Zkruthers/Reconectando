import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Distrito } from 'src/app/model/distrito';
import { People } from 'src/app/model/people';
import { DistritoService } from 'src/app/service/distrito.service';
import { PeopleService } from 'src/app/service/people.service';

@Component({
  selector: 'app-people-creaedita',
  templateUrl: './people-creaedita.component.html',
  styleUrls: ['./people-creaedita.component.css']
})
export class PeopleCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  people: People = new People()

  lista: Distrito[] = []
  idDistritoSeleccionado: number = 0

  constructor(private pS: PeopleService, private router: Router, private dS: DistritoService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      nombresPeople: new FormControl(),
      apellidosPeople: new FormControl(),
      dniPeople: new FormControl(),
      edadPeople: new FormControl(),
      generoPeople: new FormControl(),
      distrito: new FormControl()
    })

    this.dS.list().subscribe(data => {
      this.lista = data
    })

    this.route.params.subscribe((data: Params) => {
      this.idPeople = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {

    this.people.idPeople = this.form.value['id']
    this.people.nombresPeople = this.form.value['nombresPeople']
    this.people.apellidosPeople = this.form.value['apellidosPeople']
    this.people.dniPeople = this.form.value['dniPeople']
    this.people.edadPeople = this.form.value['edadPeople']
    this.people.generoPeople = this.form.value['generoPeople']
    this.people.distrito.idDistrito = this.form.value['distrito']

    if (this.form.value['nombresPeople'].length > 0 ||
      this.idDistritoSeleccionado > 0) {

      if (this.edicion) {

        //actualizar

        this.pS.update(this.people).subscribe(() => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data)
          })
        })

      }
      else {

        let d = new Distrito()
        d.idDistrito = this.idDistritoSeleccionado
        this.people.distrito = d

        //registrar

        this.pS.insert(this.people).subscribe(() => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data)
          })
        })

      }

    }

    this.router.navigate(['/pages/peoples'])

  }

  idPeople: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.pS.listId(this.idPeople).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idPeople),
          nombresPeople: new FormControl(data.nombresPeople),
          apellidosPeople: new FormControl(data.apellidosPeople),
          dniPeople: new FormControl(data.dniPeople),
          edadPeople: new FormControl(data.edadPeople),
          generoPeople: new FormControl(data.generoPeople),
          distrito: new FormControl(data.distrito.idDistrito)
        })
      })

    }

  }

}
