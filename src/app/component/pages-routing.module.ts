import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioCreaeditaComponent } from './usuario/usuario-creaedita/usuario-creaedita.component';

import { ComentarioComponent } from './comentario/comentario.component';
import { ComentarioCreaeditaComponent } from './comentario/comentario-creaedita/comentario-creaedita.component';

import { InicioComponent } from './inicio/inicio.component';

import { PeopleComponent } from './people/people.component';
import { PeopleCreaeditaComponent } from './people/people-creaedita/people-creaedita.component';

import { RolComponent } from './rol/rol.component';
import { RolCreaeditaComponent } from './rol/rol-creaedita/rol-creaedita.component';

import { PaisComponent } from './pais/pais.component';
import { PaisCreaeditaComponent } from './pais/pais-creaedita/pais-creaedita.component';

import { ResponsableComponent } from './responsable/responsable.component';
import { ResponsableCreaeditaComponent } from './responsable/responsable-creaedita/responsable-creaedita.component';

import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaCreaeditaComponent } from './categoria/categoria-creaedita/categoria-creaedita.component';

import { CiudadComponent } from './ciudad/ciudad.component';
import { CiudadCreaeditaComponent } from './ciudad/ciudad-creaedita/ciudad-creaedita.component';

import { DistritoComponent } from './distrito/distrito.component';
import { DistritoCreaeditaComponent } from './distrito/distrito-creaedita/distrito-creaedita.component';

import { ComisariaComponent } from './comisaria/comisaria.component';
import { ComisariaCreaeditaComponent } from './comisaria/comisaria-creaedita/comisaria-creaedita.component';

import { PublicacionComponent } from './publicacion/publicacion.component';
import { PublicacionCreaeditaComponent } from './publicacion/publicacion-creaedita/publicacion-creaedita.component';

import { PeoplexcomisariaComponent } from './peoplexcomisaria/peoplexcomisaria.component';
import { PeoplexcomisariaCreaeditaComponent } from './peoplexcomisaria/peoplexcomisaria-creaedita/peoplexcomisaria-creaedita.component';

import { ComisariaxresponsableComponent } from './comisariaxresponsable/comisariaxresponsable.component';
import { ComisariaxresponsableCreaeditaComponent } from './comisariaxresponsable/comisariaxresponsable-creaedita/comisariaxresponsable-creaedita.component';

import { GuardService } from '../service/guard.service';
import { ReportesComponent } from './reportes/reportes.component';
import { Reporte01Component } from './reportes/reporte01/reporte01.component';
import { Reporte02Component } from './reportes/reporte02/reporte02.component';
import { Reporte03Component } from './reportes/reporte03/reporte03.component';
import { Reporte04Component } from './reportes/reporte04/reporte04.component';


const routes: Routes = [
  {
    path: 'inicio', component: InicioComponent
  },
  {
    path: 'usuarios', component: UsuarioComponent, children: [
      {
        path: 'nuevo', component: UsuarioCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: UsuarioCreaeditaComponent
      }
    ], canActivate:[GuardService]
  },
  {
    path: 'comentarios', component: ComentarioComponent, children: [
      {
        path: 'nuevo', component: ComentarioCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: ComentarioCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'peoples', component: PeopleComponent, children: [
      {
        path: 'nuevo', component: PeopleCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: PeopleCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'roles', component: RolComponent, children: [
      {
        path: 'nuevo', component: RolCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: RolCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'paises', component: PaisComponent, children: [
      {
        path: 'nuevo', component: PaisCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: PaisCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'responsables', component: ResponsableComponent, children: [
      {
        path: 'nuevo', component: ResponsableCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: ResponsableCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'categorias', component: CategoriaComponent, children: [
      {
        path: 'nuevo', component: CategoriaCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: CategoriaCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'ciudades', component: CiudadComponent, children: [
      {
        path: 'nuevo', component: CiudadCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: CiudadCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'distritos', component: DistritoComponent, children: [
      {
        path: 'nuevo', component: DistritoCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: DistritoCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'comisarias', component: ComisariaComponent, children: [
      {
        path: 'nuevo', component: ComisariaCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: ComisariaCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'publicaciones', component: PublicacionComponent, children: [
      {
        path: 'nuevo', component: PublicacionCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: PublicacionCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'peoplexcomisaria', component: PeoplexcomisariaComponent, children: [
      {
        path: 'nuevo', component: PeoplexcomisariaCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: PeoplexcomisariaCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'comisariaxresponsable', component: ComisariaxresponsableComponent, children: [
      {
        path: 'nuevo', component: ComisariaxresponsableCreaeditaComponent
      },
      {
        path: 'edicion/:id', component: ComisariaxresponsableCreaeditaComponent
      },
    ], canActivate: [GuardService]
  },
  {
    path: 'reportes', component: ReportesComponent, children: [
      {
        path: 'people-count-distrito', component: Reporte01Component
      },
      {
        path: 'publicacion-count-categoria', component: Reporte02Component
      },
      {
        path: 'people-count-comisaria', component: Reporte03Component
      },
      {
        path: 'comentario-count-publicacion', component: Reporte04Component
      },
    ], canActivate: [GuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
