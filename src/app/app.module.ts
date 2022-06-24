import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import{FormsModule} from '@angular/forms';


import { AngularFireModule } from '@angular/fire/compat';
 import { AngularFirestoreModule,SETTINGS } from '@angular/fire/compat/firestore';
//import { AngularFireAuth } from '@angular/fire/compat/auth'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HeaderComponent } from './componentes/header/header.component';
import { IndexComponent } from './componentes/index/index.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { SliderComponent } from './componentes/slider/slider.component';
import { SobrenosotrosComponent } from './componentes/sobrenosotros/sobrenosotros.component';
import { ActividadesService } from './services/actividades.services';
import { NoticiasService } from './services/noticias.services';
import { ImagenesService } from './services/imagenes.services';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginServices } from './services/login.services';
import { AuthGuard } from './guardianes/auth.guard';

import{FlashMessagesModule} from 'angular2-flash-messages';
import { CrearNoticiaComponent } from './componentes/crear-noticia/crear-noticia.component';
import { EditarNoticiaComponent } from './componentes/editar-noticia/editar-noticia.component';
import { ActividadesComponent } from './componentes/actividades/actividades.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { AgregarImagenComponent } from './componentes/agregar-imagen/agregar-imagen.component';
import { ServicioComponent } from './componentes/servicio/servicio.component';
import { NoticiaComponent } from './componentes/noticia/noticia.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ContactoComponent,
    EditarComponent,
    FooterComponent,
    HeaderComponent,
    IndexComponent,
    LoginComponent,
    NoticiasComponent,
    ServiciosComponent,
    SliderComponent,
    SobrenosotrosComponent,
    CrearNoticiaComponent,
    EditarNoticiaComponent,
    ActividadesComponent,
    GaleriaComponent,
    AgregarImagenComponent,
    ServicioComponent,
    NoticiaComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore,'abannicoya'),
    AngularFirestoreModule,
    FormsModule,
    //AngularFireAuth,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
   ActividadesService,
   NoticiasService,
   ImagenesService,
   LoginServices,
   AuthGuard,
   {provide:SETTINGS,useValue:{}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
