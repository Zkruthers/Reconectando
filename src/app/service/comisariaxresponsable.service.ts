import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comisariaxresponsable } from '../model/comisariaxresponsable';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class ComisariaxresponsableService {

  //URL del servidor de Spring Boot (ComisariaxresponsableController -> @RequestMapping("/comisariaxresponsable")) --> localhost:8080/comisariaxresponsable

  private url = `${base_url}/comisariaxresponsable`

  constructor(private http: HttpClient) { }

  list() {

    let token = sessionStorage.getItem("token")

    return this.http.get<Comisariaxresponsable[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  insert(comxres: Comisariaxresponsable) {

    let token = sessionStorage.getItem("token")

    return this.http.post(this.url, comxres, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  private listaCambio = new Subject<Comisariaxresponsable[]>()

  setList(listaNueva: Comisariaxresponsable[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {

    let token = sessionStorage.getItem("token")

    return this.http.get<Comisariaxresponsable>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  update(comxres: Comisariaxresponsable) {
    //return this.http.put(this.url + "/" + comxres.idComisariaxresponsable, comxres)

    let token = sessionStorage.getItem("token")

    return this.http.put(this.url, comxres, {
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
