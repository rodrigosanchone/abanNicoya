import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {Actividad} from '../modelo/actividad.modelo';
import {  Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Injectable(
)
export class ActividadesService {
  actividadesColeccion: AngularFirestoreCollection<Actividad>;
  actividadDoc: AngularFirestoreDocument<Actividad>;
  actividades:Observable<Actividad[]>;
  actividad:Observable<Actividad>;
  filePath:any;
  //downloadURL: Observable<string>;


  constructor( private db: AngularFirestore,
  //  private storage: AngularFireStorage,
  private domSanitizer: DomSanitizer,

    ) {
      this.actividadesColeccion = db.collection('actividades',ref=>ref.orderBy('fecha','asc'));
     // const ref = this.storage.ref('path/to/file.pdf');
    
  }

  getActividades(): Observable<Actividad[]>{
    //Obtener los productos
    this.actividades = this.actividadesColeccion.snapshotChanges().pipe(
        map(cambios => {
            return cambios.map( accion =>{
                const datos = accion.payload.doc.data() as Actividad;
                datos.id = accion.payload.doc.id;
                return  datos;
            })
        })
    );
    return this.actividades;

 }

 agregarActividad(actividad:Actividad,){
    this.actividadesColeccion.add(actividad);
     
}


  getActividad(id: string){
    this.actividadDoc = this.db.doc<Actividad>(`actividades/${id}`);
    this.actividad= this.actividadDoc.snapshotChanges().pipe(
        map(accion=>{
            if(accion.payload.exists===false){
                return null;
            }else{
                  const datos= accion.payload.data() as Actividad;
                  datos.id= accion.payload.id;
                  return datos;
            }
        })
    );
       return this.actividad;

  }
 


 eliminarActividad(id:string):Promise<any>{
     return this.db.collection('actividades').doc(id).delete()
 }



  modificarActividad(actividad:Actividad){
     this.actividadDoc=this.db.doc(`actividades/${actividad.id}`);
     this.actividadDoc.update(actividad);
    
  }
 


}