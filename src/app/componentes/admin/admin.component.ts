import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/modelo/actividad.modelo';
import{ActividadesService} from '../../services/actividades.services'
import { Router, ActivatedRoute } from '@angular/router';
import { LoginServices } from '../../services/login.services';
//import {NgForm} from '@angular/forms'

import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  actividades: Actividad[];
  actividad: Actividad={
    nombre:'',
    fecha: Date(),
    lugar:''
    } 

    id:string;
    
    isLoggedIn: boolean;
    loggedINUser: string;
    

    constructor(
      private actividadesServicios:ActividadesService,
      private rutas:Router,
      private aRoute:ActivatedRoute,
     private loginService: LoginServices,
  
      ) { 
        this.id= this.aRoute.snapshot.paramMap.get('id');
      }

    ngOnInit() {
      this.actividadesServicios.getActividades().subscribe(
        actividades=>{
          this.actividades=actividades;
          
        }
      )

      this.loginService.getAuth().subscribe(auth=>{
        if(auth){
          this.isLoggedIn = true;
          this.loggedINUser = auth.email;
        }
        else{
          this.isLoggedIn= false;
        }
      });
      
    }

    
    agregarActividad({value,valid}:{value:Actividad,valid:boolean}){
      if(!valid){
        Swal.fire({
          title: 'Error!',
          text: 'Faltan datos que rellenar',
          icon: 'error',
          confirmButtonText: 'Volver'
        })
       
      } else{
        // this.productosServicios.uploadIMage(value,this.image);
        this.actividadesServicios.agregarActividad(value);
        console.log(value)
        Swal.fire({
          title: 'Genial!',
          text: 'Creastes una nueva actividad con exito',
          icon: 'success',
          confirmButtonText: 'Regresar'
        })
      
      }
   }

   logOut(){
    this.loginService.logout();
    this.isLoggedIn= false;
    this.rutas.navigate(['/login']);
  }

  eliminar(id:string){
    
      this.actividadesServicios.eliminarActividad(id).then(()=>{
        console.log('actividad eliminado') 
        console.log(id)
      }).catch(error=>{
        console.log(error)
      })
     
    
   }
   
}



  









