import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { People } from '../model/people';
import { Observable, Subject } from 'rxjs';
import { DistritoPeopleDTO } from '../model/distritopeopledto';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class PeopleService {

  //URL del servidor de Spring Boot (PeopleController -> @RequestMapping("/peoples")) --> localhost:8080/peoples

  private url = `${base_url}/peoples`

  constructor(private http: HttpClient) { }

  list() {

    let token = sessionStorage.getItem("token")

    return this.http.get<People[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  insert(people: People) {

    let token = sessionStorage.getItem("token")

    return this.http.post(this.url, people, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  private listaCambio = new Subject<People[]>()

  setList(listaNueva: People[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {

    let token = sessionStorage.getItem("token")

    return this.http.get<People>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  update(peo: People) {
    //return this.http.put(this.url + "/" + peo.idPeople, peo)

    let token = sessionStorage.getItem("token")

    return this.http.put(this.url, peo, {
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

  //Reporte

  getPeopleCountByDistrito(): Observable<DistritoPeopleDTO[]>{

    let token = sessionStorage.getItem("token")

    return this.http.get<DistritoPeopleDTO[]>(`${this.url}/people-count`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

}
