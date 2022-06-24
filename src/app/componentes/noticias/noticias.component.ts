import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Noticia } from 'src/app/modelo/noticia.modelo';
import{NoticiasService} from '../../services/noticias.services'

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  noticias:Noticia[]=[];
  noticia: Noticia={
    nombre:'',
    info:'',
    img:''
    } 

    
  constructor(
    private rutas:Router,
    private aRoute:ActivatedRoute,

    private noticiasServicios:NoticiasService,

  ) { }

  ngOnInit(): void {
    this.noticiasServicios.getNoticias().subscribe(
      noticias=>{
        this.noticias=noticias;
      }
    )
  }


 



}