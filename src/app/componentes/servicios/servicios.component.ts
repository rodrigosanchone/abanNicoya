import { Component, OnInit } from '@angular/core';
import { ServiciosServices } from 'src/app/services/servicios.services';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
   
  servicios=[]

  constructor(
    private serviciosServices: ServiciosServices
  ) { }

  ngOnInit(){
    this.servicios=this.serviciosServices.getServicios();
    console.log(this.servicios)
  }

}
