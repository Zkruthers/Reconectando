import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comisaria } from '../model/comisarias';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class ComisariaService {

  //URL del servidor de Spring Boot (ComisariaController -> @RequestMapping("/comisarias")) --> localhost:8080/comisarias

  private url = `${base_url}/comisarias`

  constructor(private http: HttpClient) { }

  list() {

    let token = sessionStorage.getItem("token")

    return this.http.get<Comisaria[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  insert(comisaria: Comisaria) {

    let token = sessionStorage.getItem("token")

    return this.http.post(this.url, comisaria, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  private listaCambio = new Subject<Comisaria[]>()

  setList(listaNueva: Comisaria[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {

    let token = sessionStorage.getItem("token")

    return this.http.get<Comisaria>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  update(com: Comisaria) {
    //return this.http.put(this.url + "/" + com.idComisaria, com)

    let token = sessionStorage.getItem("token")

    return this.http.put(this.url, com, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  private confirmarEliminacion = new Subject<Boolean>()

  delete(id: number) {

    let token = sessionStorage.getItem("token")

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  getConfirmDelete() {
    return this.confirmarEliminacion.asObservable()
  }

  setConfirmDelete(estado: boolean) {
    this.confirmarEliminacion.next(estado)
  }

}
