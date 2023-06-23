import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Distrito } from '../model/distrito';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class DistritoService {

  //URL del servidor de Spring Boot (DistritoController -> @RequestMapping("/distritos")) --> localhost:8080/distritos

  private url = `${base_url}/distritos`

  constructor(private http: HttpClient) { }

  list() {

    let token = sessionStorage.getItem("token")

    return this.http.get<Distrito[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  insert(distrito: Distrito) {

    let token = sessionStorage.getItem("token")

    return this.http.post(this.url, distrito, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  private listaCambio = new Subject<Distrito[]>()

  setList(listaNueva: Distrito[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {

    let token = sessionStorage.getItem("token")

    return this.http.get<Distrito>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  update(dis: Distrito) {
    //return this.http.put(this.url + "/" + dis.idDistrito, dis)

    let token = sessionStorage.getItem("token")

    return this.http.put(this.url, dis, {
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
