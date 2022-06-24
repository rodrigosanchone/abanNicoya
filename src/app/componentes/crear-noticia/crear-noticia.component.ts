import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Noticia } from 'src/app/modelo/noticia.modelo';
import{NoticiasService} from '../../services/noticias.services'
import { archivoImagen } from 'src/app/modelo/archivoImagen';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { url } from 'inspector';
@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.css']
})
export class CrearNoticiaComponent implements OnInit {

  image:archivoImagen
  
  noticias:Noticia[]=[];
  noticia: Noticia={
    nombre:'',   
    info:'',
    img:''
    } 

    id:string;

  constructor(

    private rutas:Router,
    private aRoute:ActivatedRoute,
    private img: AngularFireStorage,
    private noticiasServicios:NoticiasService,

  ) {
    this.id= this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.noticiasServicios.getNoticias().subscribe(
      noticias=>{
        this.noticias=noticias;
        console.log(this.noticia)
      }
    )
 
  }

  

  agregarNoticia({value,valid}:{value:Noticia,valid:boolean}){
    if(!valid){
      Swal.fire({
        title: 'Error!',
        text: 'Faltan datos que rellenar',
        icon: 'error',
        confirmButtonText: 'Volver'
      })
     
    } else{
      // this.productosServicios.uploadIMage(value,this.image);
      this.noticiasServicios.subirImage(value,this.image);
      
      console.log(this.image)
      Swal.fire({
        title: 'Genial!',
        text: 'Creastes una nueva actividad con exito',
        icon: 'success',
        confirmButtonText: 'Regresar'
      })
    
    }
 }

 cargarImg(event:any):void{
   this.image= event.target.files[0];
   console.log(this.image)
 }

 



eliminar(id:string){
  this.noticiasServicios.eliminarNoticia(id,).then(()=>{
   this.eliminarImg(this.noticia.img)
  }).catch(error=>{
    console.log(error)
  })
 

}

eliminarImg(noticia){
   this.eliminarImg(noticia.image)
}

}

