import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Imagen } from 'src/app/modelo/imagen.modelo';
import{ImagenesService} from '../../services/imagenes.services'
import { archivoImagen } from 'src/app/modelo/archivoImagen';

@Component({
  selector: 'app-agregar-imagen',
  templateUrl: './agregar-imagen.component.html',
  styleUrls: ['./agregar-imagen.component.css']
})
export class AgregarImagenComponent implements OnInit {
  
  image:archivoImagen
  imagenes:Imagen[]=[];
  imagen: Imagen={
    nombre:'',
    img:''
    } 

    id:string;

  constructor(   
    private rutas:Router,
    private aRoute:ActivatedRoute,
    private imagenesServicios:ImagenesService,
  ) {
    this.id= this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.imagenesServicios.getImagenes().subscribe(
      imagenes=>{
        this.imagenes=imagenes;
      })
  }


  agregarImagen({value}:{value:Imagen}){
  
      this.imagenesServicios.subirImage(value,this.image);
      console.log(value)
      Swal.fire({
        title: 'Genial!',
        text: 'Creastes una nueva actividad con exito',
        icon: 'success',
        confirmButtonText: 'Regresar'
      })
    
    }

    cargarImg(event:any):void{
      this.image= event.target.files[0];
      console.log(this.image)
    }
 
eliminar(id:string){
    
  this.imagenesServicios.eliminarImagen(id).then(()=>{
    console.log(id)
  }).catch(error=>{
    console.log(error)
  })
 

}

}
