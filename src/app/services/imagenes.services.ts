import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {Imagen} from '../modelo/imagen.modelo';
import {  Observable } from 'rxjs';
import {map,finalize} from 'rxjs/operators'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { archivoImagen } from '../modelo/archivoImagen';


@Injectable(
)
export class ImagenesService {
  imagenesColeccion: AngularFirestoreCollection<Imagen>;
  imagenDoc: AngularFirestoreDocument<Imagen>;
  imagenes:Observable<Imagen[]>;
  imagen:Observable<Imagen>;
  filePath:any;
  downloadURL: Observable<string>;


  constructor( private db: AngularFirestore,
   private storage: AngularFireStorage,
   private domSanitizer: DomSanitizer,

    ) {
      this.imagenesColeccion = db.collection('imagenes',ref=>ref.orderBy('nombre','asc'));
     // const ref = this.storage.ref('path/to/file.pdf');
    
  }

  agregarImagen(imagen:Imagen,){
    this.imagenesColeccion.add(imagen);
     
}

  getImagenes(): Observable<Imagen[]>{
    //Obtener los productos
    this.imagenes = this.imagenesColeccion.snapshotChanges().pipe(
        map(cambios => {
            return cambios.map( accion =>{
                const datos = accion.payload.doc.data() as Imagen;
                datos.id = accion.payload.doc.id;
                return  datos;
            })
        })
    );
    return this.imagenes;

 }

/*  imagenActividad(imagen:Imagen,){
    this.imagenesColeccion.add(imagen);
     
} */

subirImage(imagen:Imagen, image: archivoImagen){
  this.filePath = `images/${image.name}`;
  const fileRef = this.storage.ref(this.filePath);
  const task = this.storage.upload(this.filePath,image);
  task.snapshotChanges().pipe(
      finalize(()=>{
          fileRef.getDownloadURL().subscribe(urlImage=>{
              this.downloadURL = urlImage;
              // console.log('URL_IMAGE', urlImage);
               imagen.img=urlImage;
              this.downloadURL = urlImage;
              this.agregarImagen(imagen)
          })
      })
  ).subscribe();

}


  getImagen(id: string){
    this.imagenDoc = this.db.doc<Imagen>(`imagenes/${id}`);
    this.imagen= this.imagenDoc.snapshotChanges().pipe(
        map(accion=>{
            if(accion.payload.exists===false){
                return null;
            }else{
                  const datos= accion.payload.data() as Imagen;
                  datos.id= accion.payload.id;
                  return datos;
            }
        })
    );
       return this.imagen;

  }
 


 eliminarImagen(id:string):Promise<any>{
     return this.db.collection('imagenes').doc(id).delete()
 }

}