import { Injectable } from '@angular/core';
import { JucaboxService } from '../services/jucabox.service';
import { HttpModule, Http,RequestOptions,Headers,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlaylistService {

  playListLugar:any[]=[];

//Canciones pendientes de validar
  playListLugarSV:any[]=[];

  playListLugarV:any[]=[];

//Canciones enviadas por el usuario


  constructor(private _jucaboxService:JucaboxService, private http:Http) { }

  enviarCancion(cancion:any,lugarID:string,userID?:string){
  /*  let today = new Date();
    let cancionEnviar = {
      lugarID: lugarID,
      userID: userID,
      cancion : cancion,
      FechaEnvio:  new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()),
      estado: "Enviada"
    }*/


    let authToken = localStorage.getItem('tokenJB');

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers });
    let objeto;

if(userID)
     objeto = {
       "lugarID": lugarID,
       "userID": userID,
       "cancion" : cancion,
      // FechaEnvio:  new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()),
       "estado": "Enviada"
     };
else
  objeto = {
    "lugarID": lugarID,
    "cancion" : cancion,
   // FechaEnvio:  new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()),
    "estado": "Enviada"
  };






    return this.http
      .post('/api/addplayListLugarSV',objeto,options)
      .map(res => {

        return res.json();

      });

    //this.playListLugarSV.push(cancionEnviar);
    //this.playListLugarUser.push(cancionEnviar);



  }

  getCancionesSVSocket() {


  }


  getCancionesSV(lugarID:string,orden:string,col:string){
    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);


    let url = '/api/getPlaylistLugarSV/' + lugarID +'/' + orden + '/' + col;

    return this.http.get(url,{headers})
            .map( res =>{
                return res.json();
          }).catch(this.handleError);

  }

  getCancionesSVTOP(lugarID:string,fini:object,ffin:object){
    let authToken = localStorage.getItem('tokenJB');

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers });
    let objeto;


  objeto = {
    "lugarID": lugarID,
    "fini" : fini['date']['day'] + '/' + fini['date']['month'] + '/' + fini['date']['year'],
   // FechaEnvio:  new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()),
    "ffin": ffin['date']['day'] + '/' + ffin['date']['month'] + '/' + ffin['date']['year']
  };






    return this.http
      .post('/api/getPlaylistLugarSVTOP',objeto,options)
      .map(res => {

        return res.json();

      });

  }

  GetPlaylistsSP(){
      return this._jucaboxService.getPlaylistsUser();

  }

  GetPlaylistsJB(lugarID:string){
    let authToken = localStorage.getItem('tokenJB');

        let headers = new Headers();
        headers.append('Authorization', authToken);


        let url = '/api/getPlaylistLugar/' + lugarID ;

        return this.http.get(url,{headers})
                .map( res =>{
                    return res.json();
              }).catch(this.handleError);

  }

  addPlaylistsJB(lugarID:string,    playlistID:string,
      namePlaylist:string,
      usuarioID:string){



        let authToken = localStorage.getItem('tokenJB');

        let headers = new Headers({ 'Accept': 'application/json' });
        headers.append('Authorization', authToken);

        let options = new RequestOptions({ headers: headers });
        let objeto;


         objeto = {
           "lugarID": lugarID,
           "playlistID": playlistID,
           "namePlaylist" : namePlaylist,
          // FechaEnvio:  new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()),
           "userID": usuarioID
         };



         console.log('OBJECTO A GUARDAR',objeto);

        return this.http
          .post('/api/addPlayListLugar',objeto,options)
          .map(res => {

            return res.json();

          });

  }

  validarCancion(cancionID:string,lugarID:string){
    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);
    let objeto = {"cancionID": cancionID};
    let options = new RequestOptions({ headers: headers , body: objeto});


    return this.http
      .delete(  '/api/deletePlaylistLugarSV/' + lugarID,options)
      .map(res => {

        return res.json();
      }
    ).catch(this.handleError);
      //TODO Enviar a lista Spotify
      //TODO borrar todas las canciones del lugar en la listaSV
      //TODO cambiar estado cancion playListLugarUser a todos los usuarios del lugar si estado es ENVIADA a ACEPTADA
  }

  validarCancionTOP(cancion:any,lugarID:string,userID?:string){
    let authToken = localStorage.getItem('tokenJB');

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers });
    let objeto;

  if(userID)
     objeto = {
       "lugarID": lugarID,
       "userID": userID,
       "cancion" : cancion,
      // FechaEnvio:  new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()),
       "estado": "Enviada"
     };
  else
  objeto = {
    "lugarID": lugarID,
    "cancion" : cancion,
   // FechaEnvio:  new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()),
    "estado": "Enviada"
  };






    return this.http
      .post('/api/addplayListLugarSVTOP',objeto,options)
      .map(res => {

        return res.json();

      });

  }

  rechazarCancion(cancionID:string,lugarID:string){
    this.validarCancion(cancionID,lugarID);
    //TODO borrar todas las canciones del lugar en la listaSV
    //TODO cambiar estado cancion playListLugarUser a todos los usuarios del lugar si estado es ENVIADA a RECHAZAR

  }

  private handleError (error: Response | any) {
      // In a real world app, you might use a remote logging infrastructure

      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body['error'] || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }

      return Observable.throw(errMsg);
    }


}
