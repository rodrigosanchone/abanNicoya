import { Injectable } from '@angular/core';
import {Servicio} from '../modelo/servicio.modelo'
@Injectable({
    providedIn: 'root'
}
   
    )
    export class ServiciosServices{
        private servicios: Servicio[]=[
            {
                id: '1',
                nombre:'Castración los viernes',
                info:'Todos los viernes tenemos castración a bajo costo, escribenos para obtener más información',
                img:'assets/img/gato.png', 
                facebook:'/CastracionesNicoyaOficial',
                 whassapt:'60167728'
                
            },
            {
                id: '2',
                nombre:'Campaña de castración',
                info:'Campaña de castración genral todos los meses de perros y gastos en el centro de Nicoya',
                img:'assets/img/1.png', 
                facebook:'/CastracionesNicoyaOficial',
                whassapt:'60167728'
            },
            {
              id: '3',
              nombre: 'Cuidado de mascota',
              info:'En Maskoteando tenemos porductos para el cuidado de sus fieles amigos',
              img: 'assets/img/producto.png',
              facebook:'Maskoteando-100243088668066',
              whassapt: null
              
            }
          ]



          getServicios(){
              return [...this.servicios]
          }

          getServicio(id:string){
            return{
                ...this.servicios.find(
                  servicios=>{
                    return servicios.id===id;
                  }
                )
              }
          }
    }