import { People } from "./people";
import { Usuario } from "./usuario";
import { Categoria } from "./categoria";

export class Publicacion {
  idPublicacion: number = 0
  tituloPublicacion: string = ""
  descripcionPublicacion: string = ""
  fechaPublicacionP: Date = new Date(Date.now())
  fechaDesaparicion: Date = new Date(Date.now())
  vigentePublicacion: string = ""
  categoria: Categoria = new Categoria()
  user: Usuario = new Usuario()
  people: People = new People()
}
