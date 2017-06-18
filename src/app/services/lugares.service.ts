import { Injectable } from '@angular/core';
import {SelectModule, IOption} from 'ng-select';
//import { Select2OptionData } from 'ng2-select2';
import { HttpModule, Http,RequestOptions,Headers,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LugaresService {

  // TODO FECHA INICIO FECHA FIN
  private tokenLugares:any[]=[
    {
      id:"1",
      token:"Token1"
    },
    {
      id:"2",
      token:"Token2"
    }
  ];

  private lugaresAdmin:any[]=[{
    lugarID: "1",
    userID: "google-oauth2|113690553810319532231"
  }];

  private lugaresFav:any[]=[{
    lugarID: "1",
    userID: "google-oauth2|113690553810319532231"
  },
  {
    lugarID: "2",
    userID: "google-oauth2|113690553810319532231"
  }];

  // TODO FECHA INICIO FECHA FIN
  private lugares:any[] = [];

  constructor( private http:Http) {


   }

  isAdmin(lugarID:string,userID:string){

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);


    let url = '/api/isLugaresAdmin/' + userID + '/' + lugarID;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();



            }).catch(this.handleError);

  }



  /*public countLugaresFav(userID:string){
    let count:any[] =  this.lugaresFav.filter(
      function(data){
        return data.userID == userID;
      }
    );

    return count.length;
  }*/

  getLugares(){

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);


    let url = '/api/getLugar/';

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();



            }).catch(this.handleError);

    //return this.lugares;

  }
  getToken(id:string){

        let authToken = localStorage.getItem('tokenJB');


        let headers = new Headers();
        headers.append('Authorization', authToken);


        let url = '/api/getTokenLugar/' + id;

        return this.http.get(url,{headers})
                .map( res =>{
                  //  console.log(res.json());
                  //  this.artistas =  res.json().artists.items;

                    return res.json();



                }).catch(this.handleError);

  }

  getImageFile(imageFile:string){

        let authToken = localStorage.getItem('tokenJB');


        let headers = new Headers();
        headers.append('Authorization', authToken);


        let url = '/api/get-image-lugar/' + imageFile;

        return this.http.get(url,{headers})
                .map( res =>{
                  //  console.log(res.json());
                  //  this.artistas =  res.json().artists.items;

                    return res.json();



                }).catch(this.handleError);

  }

  getLugaresAdmin(userID:string){

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);


    let url = '/api/getLugaresAdmin/' + userID;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();



            }).catch(this.handleError);

  }

  getLugaresFavP(userID:string){

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);


    let url = '/api/getLugaresFavP/' + userID;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();



            }).catch(this.handleError);

  }

  getLugaresFav(userID:string){

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);


    let url = '/api/getLugaresFav/' + userID;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();



            }).catch(this.handleError);

  }
  getLugaresNombreT(termino:string){

    let authToken = localStorage.getItem('tokenJB');

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers });
    let objeto = {"termino": termino};

    return this.http
      .post('/api/getLugaresNombre',objeto,options)
      .map(res => {
        return res.json();
      }
    ).catch(this.handleError);
  }

  getLugaresNombre(termino:string,provincia:string,ciudad:string,tipoMusica:string,userID:string,admin:boolean){

    let authToken = localStorage.getItem('tokenJB');

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers });
    let objeto;


     objeto = {"termino": termino,"provincia": provincia,"ciudad": ciudad,"tipoMusica": tipoMusica,"userID": userID,"admin":admin};





    return this.http
      .post('/api/getLugaresNombre',objeto,options)
      .map(res => {

        return res.json();

      }
    ).catch(this.handleError);
  }

  addFav(id:string,userID:string){
    //ADD MONGODB
    let authToken = localStorage.getItem('tokenJB');

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers });
    let objeto;


     objeto = {"lugarID": id,"userID": userID};





    return this.http
      .post('/api/addLugarFav',objeto,options)
      .map(res => {
        console.log(res);
        return res.json();

      }
    ).catch(this.handleError);
  }

  removeFav(lugarID:string,userID:string){

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);
    let objeto = {"lugarID": lugarID,"userID": userID};
    let options = new RequestOptions({ headers: headers , body: objeto});


    return this.http
      .delete(  '/api/deleteLugarFav',options)
      .map(res => {
        console.log(res);
        return res.json();
      }
    ).catch(this.handleError);

    //this.lugaresFav.pop(this.getLugar(lugarID));
  }

  getFav(id:string,userID:string){
    //return this.lugaresFav.filter(
    //  function(data){ return data.id === id && data.globalClientID === GlobalClientID }
    //)[0];

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);


    let url = '/api/isLugaresFav/' + userID + '/' + id;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();



            }).catch(this.handleError);

    /*
    return this.lugaresFav.filter(
      function(data){ return data.lugarID === id && data.userID === userID }
    )[0];*/

    // for(let lugar of this.lugares){
    //   if(lugar.id == id){
    //     return lugar;
    //   }
    // }
  }

  literalFav(id:string,userID:string){
    //return this.lugaresFav.filter(
    //  function(data){ return data.id === id && data.globalClientID === GlobalClientID }
    //)[0];
    if( this.lugaresFav.filter(
      function(data){ return data.lugarID === id && data.userID === userID }
    )[0] )
    {
      return "Eliminar de favoritos..."
    }else{
      return "Añadir a favoritos..."
    }

    // for(let lugar of this.lugares){
    //   if(lugar.id == id){
    //     return lugar;
    //   }
    // }
  }

  getLugar(id:string){
    return this.lugares.filter(
      function(data){ return data.id == id }
    )[0];
    // for(let lugar of this.lugares){
    //   if(lugar.id == id){
    //     return lugar;
    //   }
    // }
  }

  addLugar(lugar:any){

    //Insertar en mongodb lugar nuevo TODO
    this.lugares.push(lugar);
    console.log(this.lugares);
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        console.log(Response);
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body['error'] || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
      }





}
export interface LugarFav{
  lugarID: string,
  userID:string
}

export interface Lugar{
  id: string,
  nombre: string,
  descripcion: string,
  img: string[],
  provincia: string,
  ciudad: string,
  direccion: string
}
