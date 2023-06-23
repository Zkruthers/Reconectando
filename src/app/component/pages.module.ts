import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './pages-routing.module';

import { PeoplexcomisariaComponent } from './peoplexcomisaria/peoplexcomisaria.component';
import { ComisariaxresponsableComponent } from './comisariaxresponsable/comisariaxresponsable.component';
import { PeoplexcomisariaListarComponent } from './peoplexcomisaria/peoplexcomisaria-listar/peoplexcomisaria-listar.component';
import { ComisariaxresponsableListarComponent } from './comisariaxresponsable/comisariaxresponsable-listar/comisariaxresponsable-listar.component';
import { PeoplexcomisariaDialogoComponent } from './peoplexcomisaria/peoplexcomisaria-listar/peoplexcomisaria-dialogo/peoplexcomisaria-dialogo.component';
import { PeoplexcomisariaCreaeditaComponent } from './peoplexcomisaria/peoplexcomisaria-creaedita/peoplexcomisaria-creaedita.component';
import { ComisariaxresponsableCreaeditaComponent } from './comisariaxresponsable/comisariaxresponsable-creaedita/comisariaxresponsable-creaedita.component';
import { ComisariaxresponsableDialogoComponent } from './comisariaxresponsable/comisariaxresponsable-listar/comisariaxresponsable-dialogo/comisariaxresponsable-dialogo.component';
import { CiudadDialogoComponent } from './ciudad/ciudad-listar/ciudad-dialogo/ciudad-dialogo.component';
import { DistritoDialogoComponent } from './distrito/distrito-listar/distrito-dialogo/distrito-dialogo.component';
import { ComisariaDialogoComponent } from './comisaria/comisaria-listar/comisaria-dialogo/comisaria-dialogo.component';
import { PublicacionDialogoComponent } from './publicacion/publicacion-listar/publicacion-dialogo/publicacion-dialogo.component';
import { PeopleComponent } from './people/people.component';
import { PeopleListarComponent } from './people/people-listar/people-listar.component';
import { PeopleCreaeditaComponent } from './people/people-creaedita/people-creaedita.component';
import { PeopleDialogoComponent } from './people/people-listar/people-dialogo/people-dialogo.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { ComisariaComponent } from './comisaria/comisaria.component';
import { DistritoComponent } from './distrito/distrito.component';
import { PaisComponent } from './pais/pais.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { ResponsableComponent } from './responsable/responsable.component';
import { RolComponent } from './rol/rol.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';
import { CiudadListarComponent } from './ciudad/ciudad-listar/ciudad-listar.component';
import { ComisariaListarComponent } from './comisaria/comisaria-listar/comisaria-listar.component';
import { DistritoListarComponent } from './distrito/distrito-listar/distrito-listar.component';
import { PaisListarComponent } from './pais/pais-listar/pais-listar.component';
import { PublicacionListarComponent } from './publicacion/publicacion-listar/publicacion-listar.component';
import { ResponsableListarComponent } from './responsable/responsable-listar/responsable-listar.component';
import { RolListarComponent } from './rol/rol-listar/rol-listar.component';
import { RolCreaeditaComponent } from './rol/rol-creaedita/rol-creaedita.component';
import { PublicacionCreaeditaComponent } from './publicacion/publicacion-creaedita/publicacion-creaedita.component';
import { CategoriaCreaeditaComponent } from './categoria/categoria-creaedita/categoria-creaedita.component';
import { ResponsableCreaeditaComponent } from './responsable/responsable-creaedita/responsable-creaedita.component';
import { ComisariaCreaeditaComponent } from './comisaria/comisaria-creaedita/comisaria-creaedita.component';
import { PaisCreaeditaComponent } from './pais/pais-creaedita/pais-creaedita.component';
import { CiudadCreaeditaComponent } from './ciudad/ciudad-creaedita/ciudad-creaedita.component';
import { DistritoCreaeditaComponent } from './distrito/distrito-creaedita/distrito-creaedita.component';
import { RolDialogoComponent } from './rol/rol-listar/rol-dialogo/rol-dialogo.component';
import { PaisDialogoComponent } from './pais/pais-listar/pais-dialogo/pais-dialogo.component';
import { ResponsableDialogoComponent } from './responsable/responsable-listar/responsable-dialogo/responsable-dialogo.component';
import { CategoriaDialogoComponent } from './categoria/categoria-listar/categoria-dialogo/categoria-dialogo.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { ComentarioListarComponent } from './comentario/comentario-listar/comentario-listar.component';
import { ComentarioDialogoComponent } from './comentario/comentario-listar/comentario-dialogo/comentario-dialogo.component';
import { ComentarioCreaeditaComponent } from './comentario/comentario-creaedita/comentario-creaedita.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioListarComponent } from './usuario/usuario-listar/usuario-listar.component';
import { UsuarioCreaeditaComponent } from './usuario/usuario-creaedita/usuario-creaedita.component';
import { UsuarioDialogoComponent } from './usuario/usuario-listar/usuario-dialogo/usuario-dialogo.component'
import { InicioComponent } from './inicio/inicio.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { ReportesComponent } from './reportes/reportes.component';
import { Reporte01Component } from './reportes/reporte01/reporte01.component';
import { Reporte02Component } from './reportes/reporte02/reporte02.component';
import { Reporte03Component } from './reportes/reporte03/reporte03.component';
import { Reporte04Component } from './reportes/reporte04/reporte04.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioListarComponent,
    UsuarioCreaeditaComponent,
    UsuarioDialogoComponent,
    ComentarioComponent,
    ComentarioListarComponent,
    ComentarioDialogoComponent,
    ComentarioCreaeditaComponent,
    InicioComponent,
    PeopleComponent,
    PeopleListarComponent,
    PeopleCreaeditaComponent,
    PeopleDialogoComponent,
    CategoriaComponent,
    CiudadComponent,
    ComisariaComponent,
    DistritoComponent,
    PaisComponent,
    PublicacionComponent,
    ResponsableComponent,
    RolComponent,
    CategoriaListarComponent,
    CiudadListarComponent,
    ComisariaListarComponent,
    DistritoListarComponent,
    PaisListarComponent,
    PublicacionListarComponent,
    ResponsableListarComponent,
    RolListarComponent,
    RolCreaeditaComponent,
    PublicacionCreaeditaComponent,
    CategoriaCreaeditaComponent,
    ResponsableCreaeditaComponent,
    ComisariaCreaeditaComponent,
    PaisCreaeditaComponent,
    CiudadCreaeditaComponent,
    DistritoCreaeditaComponent,
    RolDialogoComponent,
    PaisDialogoComponent,
    ResponsableDialogoComponent,
    CategoriaDialogoComponent,
    CiudadDialogoComponent,
    DistritoDialogoComponent,
    ComisariaDialogoComponent,
    PublicacionDialogoComponent,
    PeoplexcomisariaComponent,
    ComisariaxresponsableComponent,
    PeoplexcomisariaListarComponent,
    ComisariaxresponsableListarComponent,
    PeoplexcomisariaDialogoComponent,
    PeoplexcomisariaCreaeditaComponent,
    ComisariaxresponsableCreaeditaComponent,
    ComisariaxresponsableDialogoComponent,
    ReportesComponent,
    Reporte01Component,
    Reporte02Component,
    Reporte03Component,
    Reporte04Component,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatIconModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatRadioModule,
  ],
  exports: [
    MatFormFieldModule
    ]
})
export class PagesModule { }
