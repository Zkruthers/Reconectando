import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Responsable } from '../model/responsable';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class ResponsableService {

  //URL del servidor de Spring Boot (ResponsableController -> @RequestMapping("/responsables")) --> localhost:8080/responsables

  private url = `${base_url}/responsables`

  constructor(private http: HttpClient) { }

  list() {

    let token = sessionStorage.getItem("token")

    return this.http.get<Responsable[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  insert(responsable: Responsable) {

    let token = sessionStorage.getItem("token")

    return this.http.post(this.url, responsable, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  private listaCambio = new Subject<Responsable[]>()

  setList(listaNueva: Responsable[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {

    let token = sessionStorage.getItem("token")

    return this.http.get<Responsable>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  update(res: Responsable) {
    //return this.http.put(this.url + "/" + res.idResponsable, res)

    let token = sessionStorage.getItem("token")

    return this.http.put(this.url, res, {
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
