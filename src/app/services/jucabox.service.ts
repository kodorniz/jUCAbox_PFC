import { Injectable } from '@angular/core';
import { HttpModule, Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {GLOBAL} from './global';
import { Observable } from 'rxjs/Observable';
import {
    HandyOauthStorageKeys,
    HandyOauthUserDataInterface,
    HandyOauthStorageService,
    HandyOauthConfigProvidersService,
    HandyOauthProvidersController
}  from 'ng2-handy-oauth';

import { UserService } from './user.service';



@Injectable()
export class JucaboxService {
  //pais:any = "US";
  artistas:any[]=[];
  canciones:any[]=[];
  albumes:any[]=[];
  playlists:any[]=[];
  public url: string;
  token:any;
  urlBusqueda:string = "https://api.spotify.com/v1/search";
  urlBusquedaArtista:string = "https://api.spotify.com/v1/artists/"


  constructor(private userServ: UserService,private http:Http,     private oauthProvidersController: HandyOauthProvidersController,
        private oauthConfigServ: HandyOauthConfigProvidersService,
        private storageServ: HandyOauthStorageService) {
      //this.url = GLOBAL.url;
       this.getPublic().subscribe(
        data => {

          localStorage.setItem('id_token_spotify_public','"' + data.access_token + '"');
        }
      );

  }


  public loginSpotify(): void {
      let prueba =  localStorage.getItem('id_token');
      this.userServ.setToken(prueba);
      //console.log(this.userServ.getToken());
      //console.log(prueba);
      this.oauthProvidersController.login('spotify');

  }

  public getPublic(){
    return this.http
        .get('/api/getUrlSpotify')
        .map(res =>res.json());
  }

  public getToken(){
    let locals =  localStorage.getItem('id_token_spotify');

    if(locals){

      return locals.substring(1, locals.length-1);
    }
  }

  public getTokenPublic(){
    let locals =  localStorage.getItem('id_token_spotify_public');

    if(locals){

      return locals.substring(1, locals.length-1);
    }
  }

  public getUserSpotify(){
    let locals =  localStorage.getItem('id_user_spotify');

    if(locals){

      return locals.substring(1, locals.length-1);
    }
  }


  getArtistas(nombre:string,tipo:string='&type=track,artist,playlist,album'){
    let authToken = this.getTokenPublic();


    let headers = new Headers();
    headers.append('Authorization', `Bearer ${authToken}`);

    //let options = new RequestOptions({ headers: headers });


    let query = "?q=*" + nombre + '*' + tipo;
    let url = this.urlBusqueda + query;

    return this.http.get(url,{ headers })
            .map( res =>{
              //  console.log(res.json().artists.items);
              this.playlists=[];
              this.artistas=[];
              this.albumes=[];
              this.canciones=[];
              if (typeof res.json().playlists != "undefined")
                this.playlists = res.json().playlists.items;

              if (typeof res.json().artists != "undefined")
                this.artistas =  res.json().artists.items;

              if (typeof res.json().albums != "undefined")
                this.albumes = res.json().albums.items;

              if (typeof res.json().tracks != "undefined")
                this.canciones = res.json().tracks.items;

              //  return res.json().artists.items;
              //console.log(res.json());
            })


  }

  getCanciones(nombre:string,artista:string){

    let authToken = this.getTokenPublic();


    let headers = new Headers();
    headers.append('Authorization', `Bearer ${authToken}`);

    let query = "?q=" + nombre + "&type=track";
    let url = this.urlBusqueda + query;
    this.canciones = [];
    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json().artists.items);
                //this.canciones = res.json().tracks.items;
                  for(let cancion of res.json().tracks.items ){
                    for(let artistas of cancion.artists){
                      if(artistas['name'] == artista ){
                        this.canciones.push(cancion);
                      }
                    }
                  }
              //  return res.json().artists.items;
              return this.canciones;
            })


  }

  getArtista(id:any){
    let authToken = this.getTokenPublic();


    let headers = new Headers();
    headers.append('Authorization', `Bearer ${authToken}`);

    let query =  id;
    let url = this.urlBusquedaArtista + query;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();

            })


  }









  getArtistaTop(id:any){
    let authToken = this.getTokenPublic();


    let headers = new Headers();
    headers.append('Authorization', `Bearer ${authToken}`);
    //let query =  id + "/top-tracks?country=" + this.pais;
    let query =  id + "/top-tracks"
    let url = this.urlBusquedaArtista + query;

    return this.http.get(url,{headers})
            .map( res =>{
                console.log(res.json());
              //  this.artistas =  res.json().artists.items;
                return res.json().tracks;

            })
  }

  getPlaylistsUser(){
    let authToken = this.getToken();
    let id = this.getUserSpotify();

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${authToken}`);
    //let query =  id + "/top-tracks?country=" + this.pais;
    let query =  id + "/top-tracks"
    let url = 'https://api.spotify.com/v1/users/' + id + '/playlists?limit=50';

    return this.http.get(url,{headers})
            .map( res =>{
                console.log(res.json());
              //  this.artistas =  res.json().artists.items;
                return res.json();

            })
  }

  getTracksPlaylists(idPlaylist:any){
    let authToken = this.getToken();
    let id = this.getUserSpotify();

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${authToken}`);
    //let query =  id + "/top-tracks?country=" + this.pais;
    let query =  id + "/top-tracks"
    let url = 'https://api.spotify.com/v1/users/' + id + '/playlists/' + idPlaylist + '/tracks';

    return this.http.get(url,{headers})
            .map( res =>{
                console.log(res.json());
              //  this.artistas =  res.json().artists.items;
                return res.json();

            })
  }

  public addTrackPlaylist(idPlaylist:any,track:any){

  let authToken = this.getToken();

  let headers = new Headers({ 'Accept': 'application/json' });
  headers.append('Authorization', `Bearer ${authToken}`);

  let options = new RequestOptions({ headers: headers });
  let objeto = {"uris": [track]};

  return this.http
    .post('https://api.spotify.com/v1/users/' + this.getUserSpotify() + '/playlists/'  + idPlaylist + '/tracks',objeto,options)
    .map(res => {
      console.log(res);
      return res.json();
    }
  ).catch(this.handleError);

  }

  public changePositionTrackPlaylist(idPlaylist:any,posicion:any,sentido:any){

  let authToken = this.getToken();

  let headers = new Headers({ 'Accept': 'application/json' });
  headers.append('Authorization', `Bearer ${authToken}`);

  let options = new RequestOptions({ headers: headers });
  let objeto:any;

  if(sentido == 'U'){

    objeto = {"range_start": posicion-1, "insert_before": posicion-2};
  }
  if(sentido == 'D'){

    objeto = {"range_start": posicion-1, "insert_before": posicion+1};
  }

  console.log(objeto);
  return this.http
    .put('https://api.spotify.com/v1/users/' + this.getUserSpotify() + '/playlists/'  + idPlaylist + '/tracks',objeto,options)
    .map(res => {
      console.log(res);
      return res.json();
    }
  ).catch(this.handleError);

  }


  public deleteTrackPlaylist(idPlaylist:any,track:any,posicion?:any){

  let authToken = this.getToken();
  if (!posicion)
      posicion = 0;

  let headers = new Headers({ 'Accept': 'application/json' });
  headers.append('Authorization', `Bearer ${authToken}`);
  let objeto = {"tracks": [{"positions": [ posicion ],"uri": track }]};
  let options = new RequestOptions({ headers: headers , body: objeto});


  return this.http
    .delete(  'https://api.spotify.com/v1/users/' + this.getUserSpotify() + '/playlists/'  + idPlaylist + '/tracks',options)
    .map(res => {
      console.log(res);
      return res.json();
    }
  ).catch(this.handleError);

  }

  public createPlaylist(name:string,descripcion:string){

  let authToken = this.getToken();

  let headers = new Headers({ 'Accept': 'application/json' });
  headers.append('Authorization', `Bearer ${authToken}`);

  let options = new RequestOptions({ headers: headers });
  let objeto = '{"description":"'+ descripcion +'","public":false,"name":"' + name + '"}';
  return this.http
    .post('https://api.spotify.com/v1/users/' + this.getUserSpotify() + '/playlists',objeto,options)
    .map(res => {
      console.log(res);
      return res.json();
    }
  ).catch(this.handleError);

  }

  public addSongPlayList(idPlaylist:any,idSong:any){}
  public removeSongPlayList(idPlaylist:any,idSong:any){}
  public refreshPlayList(idPlaylist:any){}

/*
  let authToken = this.getToken();
  authToken = authToken.substring(1, authToken.length-1);

  let headers = new Headers({ 'Accept': 'application/json' });
  headers.append('Authorization', `Bearer ${authToken}`);

  let options = new RequestOptions({ headers: headers });

  return this.http
    .post('https://api.spotify.com/v1/users/kodorniz/playlists','{"description":"Newplaylistdescription","public":false,"name":"NewPlaylistDesdAngular"}',options)
    .map(res => {

      return res.json();
    }
  ).catch(this.handleError);*/



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
