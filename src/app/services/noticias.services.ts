import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {Noticia} from '../modelo/noticia.modelo';
import {  Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {map, finalize} from 'rxjs/operators'
import { archivoImagen } from '../modelo/archivoImagen';



@Injectable(
)
export class NoticiasService {
  noticiasColeccion: AngularFirestoreCollection<Noticia>;
  noticiaDoc: AngularFirestoreDocument<Noticia>;
  noticias:Observable<Noticia[]>;
  productoIMG: AngularFireStorage;
  noticia:Observable<Noticia>;
  filePath:any;
  downloadURL: Observable<string>;


  constructor( private db: AngularFirestore,
   private storage: AngularFireStorage,
  private domSanitizer: DomSanitizer,

    ) {
      this.noticiasColeccion = db.collection('noticias',ref=>ref.orderBy('nombre','asc'));
     const ref = this.storage.ref('path/to/file.pdf');
     this.downloadURL = ref.getDownloadURL();
    
  }

  getNoticias(): Observable<Noticia[]>{
    //Obtener los productos
    this.noticias = this.noticiasColeccion.snapshotChanges().pipe(
        map(cambios => {
            return cambios.map( accion =>{
                const datos = accion.payload.doc.data() as Noticia;
                datos.id = accion.payload.doc.id;
                return  datos;
            })
        })
    );
    return this.noticias;

 }

 agregarNoticia(noticia:Noticia,){
    this.noticiasColeccion.add(noticia);
     
}


subirImage(noticia:Noticia, image: archivoImagen){
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath,image);
    task.snapshotChanges().pipe(
        finalize(()=>{
            fileRef.getDownloadURL().subscribe(urlImage=>{
                this.downloadURL = urlImage;
                // console.log('URL_IMAGE', urlImage);
                 noticia.img=urlImage;
                this.downloadURL = urlImage;
                this.agregarNoticia(noticia)
            })
        })
    ).subscribe();

  }


  subirOtraImage(noticia:Noticia, image: archivoImagen){
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath,image);
    task.snapshotChanges().pipe(
        finalize(()=>{
            fileRef.getDownloadURL().subscribe(urlImage=>{
                this.downloadURL = urlImage;
                // console.log('URL_IMAGE', urlImage);
                 noticia.img=urlImage;
                this.downloadURL = urlImage;
                this.modificarNoticia(noticia)
            })
        })
    ).subscribe();

  }

 eliminarImagen(noticia:Noticia,image:archivoImagen){
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.filePath.delete(this.filePath,image)
   
  }
 


  getNoticia(id: string){
    this.noticiaDoc = this.db.doc<Noticia>(`noticias/${id}`);
    this.noticia= this.noticiaDoc.snapshotChanges().pipe(
        map(accion=>{
            if(accion.payload.exists===false){
                return null;
            }else{
                  const datos= accion.payload.data() as Noticia;
                  datos.id= accion.payload.id;
                  return datos;
            }
        })
    );
       return this.noticia;

  }
 


 eliminarNoticia(id:string):Promise<any>{
     return this.db.collection('noticias').doc(id).delete()
 }



  modificarNoticia(noticia:Noticia){
     this.noticiaDoc=this.db.doc(`noticias/${noticia.id}`);
     this.noticiaDoc.update(noticia);
    
  }
 


}