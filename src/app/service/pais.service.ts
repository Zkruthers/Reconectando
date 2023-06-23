import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pais } from '../model/pais';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class PaisService {

  //URL del servidor de Spring Boot (PaisController -> @RequestMapping("/paises")) --> localhost:8080/paises

  private url = `${base_url}/paises`

  constructor(private http: HttpClient) { }

  list() {

    let token = sessionStorage.getItem("token")

    return this.http.get<Pais[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  insert(pais: Pais) {

    let token = sessionStorage.getItem("token")

    return this.http.post(this.url, pais, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  private listaCambio = new Subject<Pais[]>()

  setList(listaNueva: Pais[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
    return this.listaCambio.asObservable()
  }

  listId(id: number){

    let token = sessionStorage.getItem("token")

    return this.http.get<Pais>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  update(pais: Pais){
   // return this.http.put(this.url + "/" + aut.idAuthor, aut);

   let token = sessionStorage.getItem("token")

   return this.http.put(this.url, pais, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
   });

  }

  private confirmarEliminacion = new Subject<Boolean>()

  delete(id: number){

    let token = sessionStorage.getItem("token")

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  getConfirmDelete(){
    return this.confirmarEliminacion.asObservable()
  }

  setConfirmDelete(estado: boolean){
    this.confirmarEliminacion.next(estado)
  }

}
