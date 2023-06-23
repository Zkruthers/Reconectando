import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Publicacion } from '../model/publicacion';
import { Observable, Subject } from 'rxjs';
import { CategoriaPublicacionDTO } from '../model/categoriapublicaciondto';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class PublicacionService {

  //URL del servidor de Spring Boot (PublicacionController -> @RequestMapping("/publicaciones")) --> localhost:8080/publicaciones

  private url = `${base_url}/publicaciones`

  constructor(private http: HttpClient) { }

  list() {

    let token = sessionStorage.getItem("token")

    return this.http.get<Publicacion[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  insert(publicacion: Publicacion) {

    let token = sessionStorage.getItem("token")

    return this.http.post(this.url, publicacion, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  private listaCambio = new Subject<Publicacion[]>()

  setList(listaNueva: Publicacion[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {

    let token = sessionStorage.getItem("token")

    return this.http.get<Publicacion>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  update(pub: Publicacion) {
    //return this.http.put(this.url + "/" + usu.id, usu)

    let token = sessionStorage.getItem("token")

    return this.http.put(this.url, pub, {
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

  getPublicacionCountByCategoria(): Observable<CategoriaPublicacionDTO[]>{

    let token = sessionStorage.getItem("token")

    return this.http.get<CategoriaPublicacionDTO[]>(`${this.url}/publicacion-count`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }
}
