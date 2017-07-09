import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Mensaje} from "../interfaces/mensaje.interface";
@Injectable()
export class ChatService {

chats: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase) {

  //this.chats = db.list('/chats');
 }

 cargarMensajes(){
   this.chats = this.db.list('/chats',{
     query:{
       limitToLast:20,
       orderByKey:true
     }
   });

   return this.chats;
 }

 agregarMensaje(texto:string,nombre:string){
    let mensaje:any = {
      nombre: nombre,
      mensaje: texto,
      idUser: localStorage.getItem('userJB'),
      fechaMensaje: new Date().toString()
    }
    console.log(mensaje);
    return this.chats.push(mensaje);
 }

}
