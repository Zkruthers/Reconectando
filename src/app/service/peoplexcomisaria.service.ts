import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Peoplexcomisaria } from '../model/peoplexcomisaria';
import { Observable, Subject } from 'rxjs';
import { ComisariaPeopleDTO } from '../model/comisariapeopledto';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class PeoplexcomisariaService {

  //URL del servidor de Spring Boot (PeoplexcomisariaController -> @RequestMapping("/peoplexcomisaria")) --> localhost:8080/peoplexcomisaria

  private url = `${base_url}/peoplexcomisaria`

  constructor(private http: HttpClient) { }

  list() {

    let token = sessionStorage.getItem("token")

    return this.http.get<Peoplexcomisaria[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  insert(peoxcomi: Peoplexcomisaria) {

    let token = sessionStorage.getItem("token")

    return this.http.post(this.url, peoxcomi, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  private listaCambio = new Subject<Peoplexcomisaria[]>()

  setList(listaNueva: Peoplexcomisaria[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {

    let token = sessionStorage.getItem("token")

    return this.http.get<Peoplexcomisaria>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  update(peoxcomi: Peoplexcomisaria) {
    //return this.http.put(this.url + "/" + peoxcomi.idPeoplexcomisaria, peoxcomi)

    let token = sessionStorage.getItem("token")

    return this.http.put(this.url, peoxcomi, {
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

  //reporte

  getPeopleCountByComisaria(): Observable<ComisariaPeopleDTO[]> {

    let token = sessionStorage.getItem("token")

    return this.http.get<ComisariaPeopleDTO[]>(`${this.url}/people-count`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

}
