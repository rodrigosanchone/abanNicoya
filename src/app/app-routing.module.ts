import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './componentes/index/index.component';
import {GaleriaComponent} from './componentes/galeria/galeria.component';
import {AdminComponent} from './componentes/admin/admin.component';
import {LoginComponent} from './componentes/login/login.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { EditarNoticiaComponent } from './componentes/editar-noticia/editar-noticia.component';
import { AuthGuard } from './guardianes/auth.guard';
import { CrearNoticiaComponent } from './componentes/crear-noticia/crear-noticia.component';
import { AgregarImagenComponent } from './componentes/agregar-imagen/agregar-imagen.component';
import { ServicioComponent } from './componentes/servicio/servicio.component';
import { NoticiaComponent } from './componentes/noticia/noticia.component';
const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'index', component:IndexComponent},
  {path:'galeria', component:GaleriaComponent},
  {path:'login', component:LoginComponent},
  {path:`servicio/:id`, component: ServicioComponent},
  {path:`noticia/:id`, component: NoticiaComponent},
  {path:`admin`, component: AdminComponent,canActivate:[AuthGuard]},
  {path:`crear-noticia`, component: CrearNoticiaComponent,canActivate:[AuthGuard]},
  {path:`agregar-imagen`, component: AgregarImagenComponent,canActivate:[AuthGuard]},
  {path:`actividad/editar/:id`, component: EditarComponent,canActivate:[AuthGuard]},
  {path:`noticia/editar-noticia/:id`, component: EditarNoticiaComponent,canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
