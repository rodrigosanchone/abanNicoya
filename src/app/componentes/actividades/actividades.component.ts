import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/modelo/actividad.modelo';
import{ActividadesService} from '../../services/actividades.services'
@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  actividades: Actividad[]=[];
  actividad: Actividad={
    nombre:'',
    fecha: '',
    lugar:''
  }

  constructor(
     private actividadesServicios:ActividadesService
  ) { }

  ngOnInit(): void {
    this.actividadesServicios.getActividades().subscribe(
      actividades=>{
        this.actividades=actividades;
        
      }
    )
  }
}