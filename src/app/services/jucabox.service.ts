import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JucaboxService {
  pais:any = "ES";
  artistas:any[]=[];
  canciones:any[]=[];
  albumes:any[]=[];
  playlists:any[]=[];

  urlBusqueda:string = "https://api.spotify.com/v1/search";
  urlBusquedaArtista:string = "https://api.spotify.com/v1/artists/"


  constructor(private http:Http) { }

  getArtistas(nombre:string,tipo:string='&type=track,artist,playlist,album'){

    let query = "?q=*" + nombre + '*' + tipo;
    let url = this.urlBusqueda + query;

    return this.http.get(url)
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
    let query = "?q=" + nombre + "&type=track";
    let url = this.urlBusqueda + query;
    this.canciones = [];
    return this.http.get(url)
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
    let query =  id;
    let url = this.urlBusquedaArtista + query;

    return this.http.get(url)
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;
                return res.json();

            })


  }







  getArtistaTop(id:any){
    let query =  id + "/top-tracks?country=" + this.pais;
    let url = this.urlBusquedaArtista + query;

    return this.http.get(url)
            .map( res =>{
                console.log(res.json());
              //  this.artistas =  res.json().artists.items;
                return res.json().tracks;

            })


  }

}
