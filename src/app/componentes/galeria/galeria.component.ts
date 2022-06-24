import { Component, OnInit } from '@angular/core';
import { Imagen } from 'src/app/modelo/imagen.modelo';
import{ImagenesService} from '../../services/imagenes.services'

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  imagenes:Imagen[]=[];
  imagen: Imagen={
    nombre:'',
    img:''
    } 

  constructor(
    private imagenesServicios:ImagenesService,
  ) { }

  ngOnInit(): void {
    this.imagenesServicios.getImagenes().subscribe(
      imagenes=>{
        this.imagenes=imagenes;
      })
  }

}
