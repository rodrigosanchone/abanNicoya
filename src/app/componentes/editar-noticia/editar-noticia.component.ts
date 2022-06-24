import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/modelo/noticia.modelo';
import{NoticiasService} from '../../services/noticias.services'
import { Router, ActivatedRoute } from '@angular/router';
import { archivoImagen } from 'src/app/modelo/archivoImagen';
@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.component.html',
  styleUrls: ['./editar-noticia.component.css']
})
export class EditarNoticiaComponent implements OnInit {

  id:string;
  imagen:archivoImagen;
  imagenOriginal:any;
  noticias: Noticia[];
  noticia: Noticia={
    nombre:'',
    info:'',
    img:'',
  }

  constructor(
    private noticiasServicios:NoticiasService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.noticiasServicios.getNoticia(this.id).subscribe(noticia=>{
       this.noticia=noticia;
    })
    console.log(this.noticia)
  }

  editarNoticia({value,valid}:{value:Noticia,valid:boolean}){
     
    if(this.imagen===this.imagenOriginal){
      if(!valid){
        alert('error!')
      }else{
        value.id = this.id;
        this.noticiasServicios.modificarNoticia(value);
        this.router.navigate(['/crear-noticia']);
      }
    } else{
      if(!valid){
        alert('error!')
      }else{
        value.id = this.id;
        this.noticiasServicios.subirOtraImage(value,this.imagen);
        this.router.navigate(['/crear-noticia']);
      }
    }

    if(!valid){
      alert('error!')
    }else{
      value.id = this.id;
      this.noticiasServicios.subirOtraImage(value,this.imagen);
      this.router.navigate(['/crear-noticia']);
    }
     
 }

 cargarImg(event:any):void{
  this.imagen =  event.target.files[0]
 // console.log(this.img);
}

}
