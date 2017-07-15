import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Mensaje} from "../interfaces/mensaje.interface";
import 'rxjs/add/operator/map'
import { HttpModule, Http,RequestOptions,Headers,URLSearchParams, Response } from '@angular/http';

@Injectable()
export class ChatService {

chats: FirebaseListObservable<any[]>;
    constructor(private db: AngularFireDatabase,private http:Http) {

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


 getUltimoClick(userID:string,userIDto:string){

   let authToken = localStorage.getItem('tokenJB');


   let headers = new Headers();
   headers.append('Authorization', authToken);


   let url = '/api/getDateMax/'+ userID + '/' + userIDto;

   return this.http.get(url,{headers})
           .map( res =>{
             //  console.log(res.json());
             //  this.artistas =  res.json().artists.items;

               return res.json();



           });

   //return this.lugares;

 }

 getUltimoMsg(userID:string,userIDto:string){

   let authToken = localStorage.getItem('tokenJB');


   let headers = new Headers();
   headers.append('Authorization', authToken);


   let url = '/api/getDateMaxMsg/'+ userIDto + '/' + userID;

   return this.http.get(url,{headers})
           .map( res =>{
             //  console.log(res.json());
             //  this.artistas =  res.json().artists.items;

               return res.json();



           });

   //return this.lugares;

 }

 getUltimoClickAll(userID:string){

   let authToken = localStorage.getItem('tokenJB');


   let headers = new Headers();
   headers.append('Authorization', authToken);


   let url = '/api/getDateMaxAll/'+ userID;

   return this.http.get(url,{headers})
           .map( res =>{
             //  console.log(res.json());
             //  this.artistas =  res.json().artists.items;

               return res.json();



           });

   //return this.lugares;

 }

 getUltimoClickAllMsg(userID:string){

   let authToken = localStorage.getItem('tokenJB');


   let headers = new Headers();
   headers.append('Authorization', authToken);


   let url = '/api/getDateMaxAllMsg/'+ userID;

   return this.http.get(url,{headers})
           .map( res =>{
             //  console.log(res.json());
             //  this.artistas =  res.json().artists.items;

               return res.json();



           });

   //return this.lugares;

 }




 addClickUser(userID:string,userIDto:string){
   //ADD MONGODB
   let authToken = localStorage.getItem('tokenJB');

   let headers = new Headers({ 'Accept': 'application/json' });
   headers.append('Authorization', authToken);

   let options = new RequestOptions({ headers: headers });
   let objeto;


    objeto = {"userID": userID,"userIDto": userIDto};





   return this.http
     .post('/api/addUserClick',objeto,options)
     .map(res => {
       return res.json();

     }
   );
 }

 addMsgUser(userID:string,userIDto:string){
   //ADD MONGODB
   let authToken = localStorage.getItem('tokenJB');

   let headers = new Headers({ 'Accept': 'application/json' });
   headers.append('Authorization', authToken);

   let options = new RequestOptions({ headers: headers });
   let objeto;


    objeto = {"userID": userID,"userIDto": userIDto};





   return this.http
     .post('/api/addUserMessage',objeto,options)
     .map(res => {
       return res.json();

     }
   );
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
