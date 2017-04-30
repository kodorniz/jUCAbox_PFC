import { Injectable } from '@angular/core';
import { JucaboxService } from '../services/jucabox.service';




@Injectable()
export class ArtistasService {

  constructor(private _jucaboxService:JucaboxService) { }
  private artistasFav:any[]=[{
    artistaID: "08td7MxkoHQkXnWAYD8d6Q",
    globalClientID: "XXlEf03iy4rwFqqOTIQJ1JEskirj54ZR"
  },
  {
    artistaID: "5gOJTI4TusSENizxhcG7jB",
    globalClientID: "XXlEf03iy4rwFqqOTIQJ1JEskirj54ZR"
  }];

  public getArtistasFav(userID: string){
    let artistasTotal:any[]=[];

    for (var _i = 0; _i < this.artistasFav.length; _i++){

      this._jucaboxService.getArtista(this.artistasFav[_i].artistaID).subscribe(data =>{
         artistasTotal.push(data);
       });
      console.log(artistasTotal);
    }

    return artistasTotal;
  }

  public removeFav(artistaID:string,userID: string){
    console.log("Eliminar con MONGO");
  }
}
