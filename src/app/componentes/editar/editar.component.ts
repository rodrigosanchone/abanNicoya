import { Component, OnInit, } from '@angular/core';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { Actividad } from 'src/app/modelo/actividad.modelo';
import{ActividadesService} from '../../services/actividades.services'
import { Router, ActivatedRoute } from '@angular/router';

//import {NgForm} from '@angular/forms'
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})


export class EditarComponent implements OnInit {
  id:string;
  actividades: Actividad[];
  actividad: Actividad={
    nombre:'',
    fecha:'',
    lugar:'',
  }



  

  constructor(
   
    private actividadesServicios:ActividadesService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {
   
   }
  
  
  ngOnInit(){
    this.id=this.route.snapshot.params['id'];
    this.actividadesServicios.getActividad(this.id).subscribe(actividad=>{
       this.actividad=actividad;
    })
    console.log(this.actividad)
  }







  editarActividad({value,valid}:{value:Actividad,valid:boolean}){
    
    if(!valid){
      alert('error!')
    }else{
      value.id = this.id;
      this.actividadesServicios.modificarActividad(value);
      console.log("llamando a la funcion editar ")
      this.router.navigate(['/admin']);
    }
     
 }

 
}
