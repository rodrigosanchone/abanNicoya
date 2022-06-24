import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Servicio } from '../../modelo/servicio.modelo';

import { ServiciosServices } from '../../services/servicios.services';


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  servicio: Servicio
  constructor(
    private activated: ActivatedRoute,
    private serviciosServices: ServiciosServices

  ) { }

  ngOnInit(): void {
    this.activated.params.subscribe(params=>{
      
      this.servicio= this.serviciosServices.getServicio(params['id']);   
  })

  

}
}
