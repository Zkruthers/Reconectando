import { Usuario } from "./usuario";
import { Publicacion } from "./publicacion";

export class Comentario {
  idComentario: number = 0
  descripcionComentario: string = ""
  fechaPublicacionC: Date = new Date(Date.now())
  user: Usuario = new Usuario()
  publicacion: Publicacion = new Publicacion()
}
