import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-creaedita',
  templateUrl: './categoria-creaedita.component.html',
  styleUrls: ['./categoria-creaedita.component.css']
})
export class CategoriaCreaeditaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  categoria: Categoria = new Categoria()

  constructor(private cS: CategoriaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(),
      nombreCategoria: new FormControl(),
      rangoCategoria: new FormControl(),
      descripcionCategoria: new FormControl()
    })

    this.route.params.subscribe((data: Params) => {
      this.idCategoria = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

  }

  aceptar(): void {

    this.categoria.idCategoria = this.form.value['id']
    this.categoria.nombreCategoria = this.form.value['nombreCategoria']
    this.categoria.rangoCategoria = this.form.value['rangoCategoria']
    this.categoria.descripcionCategoria = this.form.value['descripcionCategoria']

    if (this.form.value['nombreCategoria'].length > 0) {

      if (this.edicion) {

        //actualizar

        this.cS.update(this.categoria).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })

      }
      else {

        //registrar

        this.cS.insert(this.categoria).subscribe(data => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })

      }

      this.router.navigate(['/pages/categorias'])
    }

  }

  idCategoria: number = 0
  edicion: boolean = false

  init() {

    if (this.edicion) {

      this.cS.listId(this.idCategoria).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idCategoria),
          nombreCategoria: new FormControl(data.nombreCategoria),
          rangoCategoria: new FormControl(data.rangoCategoria),
          descripcionCategoria: new FormControl(data.descripcionCategoria)
        })
      })

    }

  }

}
