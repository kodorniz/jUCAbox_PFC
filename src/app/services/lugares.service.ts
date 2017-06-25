import { Injectable } from '@angular/core';
import {SelectModule, IOption} from 'ng-select';
//import { Select2OptionData } from 'ng2-select2';
import { HttpModule, Http,RequestOptions,Headers,URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LugaresService {

  // TODO FECHA INICIO FECHA FIN
  private tokenLugares:any[]=[];

  private lugaresAdmin:any[]=[];

  private lugaresFav:any[]=[];

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

  getLugaresFavL(lugarID:string){

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);


    let url = '/api/getLugaresFavL/' + lugarID;

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
    headers.append('Authorization', authToken);
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

  removeFavAll(lugarID:string){

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);
    let objeto = {"lugarID": lugarID};
    let options = new RequestOptions({ headers: headers , body: objeto});


    return this.http
      .delete(  '/api/deleteLugarFavAll',options)
      .map(res => {
        console.log(res);
        return res.json();
      }
    ).catch(this.handleError);

    //this.lugaresFav.pop(this.getLugar(lugarID));
  }

  removeLugar(lugarID:string){

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers});


    return this.http
      .delete(  '/api/deleteLugar/' + lugarID,options)
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

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);


    let url = '/api/getLugar/' + id;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();



            }).catch(this.handleError);


    // for(let lugar of this.lugares){
    //   if(lugar.id == id){
    //     return lugar;
    //   }
    // }
  }

  addLugar(lugar:any){

    let authToken = localStorage.getItem('tokenJB');

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers });
    let objeto;


    objeto = {
      ciudad: lugar.ciudad,
      descripcion: lugar.descripcion,
      direccion: lugar.direccion,
      email:lugar.email,
      nombre: lugar.nombre,
      provincia: lugar.provincia,
      token: lugar.token,
      userID: localStorage.getItem('userJB')
    }




    return this.http
      .post('/api/addLugar',objeto,options)
      .map(res => {
        console.log(res);
        return res.json();
      }
    ).catch(this.handleError);

    }

    uploadImageLugar(img:any,lugarID:any){

      let authToken = localStorage.getItem('tokenJB');

      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Authorization', authToken);

      let options = new RequestOptions({ headers: headers });
      let objeto;


      objeto = {
      }




      return this.http
        .post('/api/upload-image-lugar/',objeto,options)
        .map(res => {
          console.log(res);
          return res.json();
        }
      ).catch(this.handleError);

      }

      deleteAllimg(lugarID:any){

        let authToken = localStorage.getItem('tokenJB');

        let headers = new Headers({ 'Accept': 'application/json' });
        headers.append('Authorization', authToken);

        let options = new RequestOptions({ headers: headers });
        let objeto;


        objeto = {
        }




        return this.http
          .post('/api/delete-Allimage-lugar/' + lugarID,objeto,options)
          .map(res => {
            console.log(res);
            return res.json();
          }
        ).catch(this.handleError);

        }

    updateLugar(lugar:any,lugarID:any){

      let authToken = localStorage.getItem('tokenJB');

      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Authorization', authToken);

      let options = new RequestOptions({ headers: headers });
      let objeto;


      objeto = {
        ciudad: lugar.ciudad,
        descripcion: lugar.descripcion,
        direccion: lugar.direccion,
        email:lugar.email,
        nombre: lugar.nombre,
        provincia: lugar.provincia,
        token: lugar.token,
        userID: localStorage.getItem('userJB')
      }

      console.log(objeto);




      return this.http
        .put('/api/updateLugar/' + lugarID,objeto,options)
        .map(res => {
          console.log(res);
          return res.json();
        }
      ).catch(this.handleError);

      }

      updateLugarTM(tipoMusica:any,lugarID:any){

        let authToken = localStorage.getItem('tokenJB');

        let headers = new Headers({ 'Accept': 'application/json' });
        headers.append('Authorization', authToken);

        let options = new RequestOptions({ headers: headers });
        let objeto;


        objeto = {
          tipoMusica: tipoMusica
        }






        return this.http
          .put('/api/updateLugarTM/' + lugarID,objeto,options)
          .map(res => {
            console.log(res);
            return res.json();
          }
        ).catch(this.handleError);

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


      makeFileRequest(url:string, params: Array<string>,files: Array<File>,name: string){
        var token = localStorage.getItem('tokenJB');

        return new Promise(function(resolve,reject){
          var formData:any = new FormData();
          var xhr = new XMLHttpRequest();
          if (files){
          for(let i=0; i< files.length;i++){
            formData.append(name,files[i],files[i].name);
          }

          xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
              if(xhr.status == 200){
                resolve(JSON.parse(xhr.response));
              }else{
                  reject(xhr.response);
              }
            }
          }

          xhr.open('POST',url,true);
          xhr.setRequestHeader('Authorization',token);
          xhr.send(formData);
        }


        })

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
