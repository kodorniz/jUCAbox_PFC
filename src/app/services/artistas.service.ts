import { Injectable } from '@angular/core';
import { JucaboxService } from '../services/jucabox.service';




@Injectable()
export class ArtistasService {

  constructor(private _jucaboxService:JucaboxService) { }
  private artistasFav:any[]=[{
    artistaID: "08td7MxkoHQkXnWAYD8d6Q",
    userID: "google-oauth2|113690553810319532231"
  },
  {
    artistaID: "5gOJTI4TusSENizxhcG7jB",
    userID: "google-oauth2|113690553810319532231"
  }];

  public getArtistasFav(userID: string){
    let artistasTotal:any[]=[];

    for (var _i = 0; _i < this.artistasFav.length; _i++){
      if(this.artistasFav[_i].userID == userID){
      this._jucaboxService.getArtista(this.artistasFav[_i].artistaID).subscribe(data =>{

         artistasTotal.push(data);
       });
     }

    }

    return artistasTotal;
  }

  getFav(id:string,userID:string){
    //return this.lugaresFav.filter(
    //  function(data){ return data.id === id && data.globalClientID === GlobalClientID }
    //)[0];
    return this.artistasFav.filter(
      function(data){ return data.artistaID === id && data.userID === userID }
    )[0];
}

  public addFav(artistaID:string,userID:string){

    this.artistasFav.push(
      {
        artistaID: artistaID,
        userID: userID
      });

  }

  public removeFav(artistaID:string,userID: string){
    console.log("Eliminar con MONGO");
  }
}
