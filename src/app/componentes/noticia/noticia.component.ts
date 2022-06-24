import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from 'src/app/modelo/noticia.modelo';
import { NoticiasService } from 'src/app/services/noticias.services';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  id:string;
  noticias: Noticia[];
  noticia: Noticia={
    nombre:'',
    resumen:'',
    info:'',
    img:'',
  }
  constructor(
    private activated: ActivatedRoute,
    private noticiasService: NoticiasService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  this.id=this.route.snapshot.params['id'];
  this.noticiasService.getNoticia(this.id).subscribe(noticia=>{
     this.noticia=noticia;
  })
}

}
