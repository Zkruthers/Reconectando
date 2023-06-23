import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comentario } from '../model/comentario';
import { Observable, Subject } from 'rxjs';
import { PublicacionComentarioDTO } from '../model/publicacioncomentariodto';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class ComentarioService {

  //URL del servidor de Spring Boot (ComentarioController -> @RequestMapping("/comentarios")) --> localhost:8080/comentarios

  private url = `${base_url}/comentarios`

  constructor(private http: HttpClient) { }

  list() {

    let token = sessionStorage.getItem("token")

    return this.http.get<Comentario[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  insert(comentario: Comentario) {

    let token = sessionStorage.getItem("token")

    return this.http.post(this.url, comentario, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  private listaCambio = new Subject<Comentario[]>()

  setList(listaNueva: Comentario[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {

    let token = sessionStorage.getItem("token")

    return this.http.get<Comentario>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }

  update(com: Comentario) {
    //return this.http.put(this.url + '/' + com.idComentario, com);

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

  //reporte

  getComentarioCountByPublicacion(): Observable<PublicacionComentarioDTO[]> {

    let token = sessionStorage.getItem("token")

    return this.http.get<PublicacionComentarioDTO[]>(`${this.url}/comentario-count`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }
}
