import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Mensaje} from "../interfaces/mensaje.interface";
import 'rxjs/add/operator/map'

@Injectable()
export class ChatService {

chats: FirebaseListObservable<any[]>;
    constructor(private db: AngularFireDatabase) {

  //this.chats = db.list('/chats');
 }

 cargarMensajes(){
   this.chats = this.db.list('/chats',{

     query:{
       limitToLast:100,
       orderByKey:true
     }
   });

   return this.chats;
 }



 agregarMensaje(texto:string,nombre:string,idUserTo){
    let mensaje:any = {
      nombre: nombre,
      mensaje: texto,
      idUser: localStorage.getItem('userJB'),
      fechaMensaje: new Date().toString(),
      idUserTo: idUserTo
    }
    return this.chats.push(mensaje);
 }

}
