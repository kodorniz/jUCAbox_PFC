import { Injectable } from '@angular/core';

@Injectable()
export class PlaylistService {

  playListLugar:any[]=[{
    lugarID:"1",
    //Aqui poner el codigo spotify
    playlistID:"codigoSpoti",
    DescripcionPL:"desc playList"
  }];

  playListLugarSV:any[]=[{
    lugarID: "1",
    userID: "google-oauth2|113690553810319532231",
    cancion : { "album": { "album_type": "album", "artists": [ { "external_urls": { "spotify": "https://open.spotify.com/artist/5gOJTI4TusSENizxhcG7jB" }, "href": "https://api.spotify.com/v1/artists/5gOJTI4TusSENizxhcG7jB", "id": "5gOJTI4TusSENizxhcG7jB", "name": "David Bisbal", "type": "artist", "uri": "spotify:artist:5gOJTI4TusSENizxhcG7jB" } ], "available_markets": [ "CA", "MX", "US" ], "external_urls": { "spotify": "https://open.spotify.com/album/6OTUBhlBFkkFd1qu3mgjjn" }, "href": "https://api.spotify.com/v1/albums/6OTUBhlBFkkFd1qu3mgjjn", "id": "6OTUBhlBFkkFd1qu3mgjjn", "images": [ { "height": 640, "url": "https://i.scdn.co/image/f4498f8e9dede0e58d1a072ae76489e9442ef7a3", "width": 640 }, { "height": 300, "url": "https://i.scdn.co/image/4e3fa7e322f3c96a704be3eeeef18c8b2a1c3b8e", "width": 300 }, { "height": 64, "url": "https://i.scdn.co/image/2e3760ea3ac0daceb8881f3bc9b94d7444f9d054", "width": 64 } ], "name": "Corazón Latino", "type": "album", "uri": "spotify:album:6OTUBhlBFkkFd1qu3mgjjn" }, "artists": [ { "external_urls": { "spotify": "https://open.spotify.com/artist/5gOJTI4TusSENizxhcG7jB" }, "href": "https://api.spotify.com/v1/artists/5gOJTI4TusSENizxhcG7jB", "id": "5gOJTI4TusSENizxhcG7jB", "name": "David Bisbal", "type": "artist", "uri": "spotify:artist:5gOJTI4TusSENizxhcG7jB" } ], "available_markets": [ "CA", "MX", "US" ], "disc_number": 1, "duration_ms": 240600, "explicit": false, "external_ids": { "isrc": "ES6010200297" }, "external_urls": { "spotify": "https://open.spotify.com/track/1i5TNf36nNehR917w89opI" }, "href": "https://api.spotify.com/v1/tracks/1i5TNf36nNehR917w89opI", "id": "1i5TNf36nNehR917w89opI", "name": "Lloraré Las Penas", "popularity": 37, "preview_url": "https://p.scdn.co/mp3-preview/e5b76695ab2ab824b076c8d44be85b90f348fe17?cid=null", "track_number": 5, "type": "track", "uri": "spotify:track:1i5TNf36nNehR917w89opI" },
    FechaEnvio: new Date(2017, 2, 28, 19, 20, 12)


  }];

  playListLugarV:any[]=[];

  playListLugarUser:any[]=[{
    lugarID: "1",
    userID: "google-oauth2|113690553810319532231",
    cancion : { "album": { "album_type": "album", "artists": [ { "external_urls": { "spotify": "https://open.spotify.com/artist/5gOJTI4TusSENizxhcG7jB" }, "href": "https://api.spotify.com/v1/artists/5gOJTI4TusSENizxhcG7jB", "id": "5gOJTI4TusSENizxhcG7jB", "name": "David Bisbal", "type": "artist", "uri": "spotify:artist:5gOJTI4TusSENizxhcG7jB" } ], "available_markets": [ "CA", "MX", "US" ], "external_urls": { "spotify": "https://open.spotify.com/album/6OTUBhlBFkkFd1qu3mgjjn" }, "href": "https://api.spotify.com/v1/albums/6OTUBhlBFkkFd1qu3mgjjn", "id": "6OTUBhlBFkkFd1qu3mgjjn", "images": [ { "height": 640, "url": "https://i.scdn.co/image/f4498f8e9dede0e58d1a072ae76489e9442ef7a3", "width": 640 }, { "height": 300, "url": "https://i.scdn.co/image/4e3fa7e322f3c96a704be3eeeef18c8b2a1c3b8e", "width": 300 }, { "height": 64, "url": "https://i.scdn.co/image/2e3760ea3ac0daceb8881f3bc9b94d7444f9d054", "width": 64 } ], "name": "Corazón Latino", "type": "album", "uri": "spotify:album:6OTUBhlBFkkFd1qu3mgjjn" }, "artists": [ { "external_urls": { "spotify": "https://open.spotify.com/artist/5gOJTI4TusSENizxhcG7jB" }, "href": "https://api.spotify.com/v1/artists/5gOJTI4TusSENizxhcG7jB", "id": "5gOJTI4TusSENizxhcG7jB", "name": "David Bisbal", "type": "artist", "uri": "spotify:artist:5gOJTI4TusSENizxhcG7jB" } ], "available_markets": [ "CA", "MX", "US" ], "disc_number": 1, "duration_ms": 240600, "explicit": false, "external_ids": { "isrc": "ES6010200297" }, "external_urls": { "spotify": "https://open.spotify.com/track/1i5TNf36nNehR917w89opI" }, "href": "https://api.spotify.com/v1/tracks/1i5TNf36nNehR917w89opI", "id": "1i5TNf36nNehR917w89opI", "name": "Lloraré Las Penas", "popularity": 37, "preview_url": "https://p.scdn.co/mp3-preview/e5b76695ab2ab824b076c8d44be85b90f348fe17?cid=null", "track_number": 5, "type": "track", "uri": "spotify:track:1i5TNf36nNehR917w89opI" },
    FechaEnvio: new Date(2017, 2, 28, 19, 20, 12),
    Estado: "Enviada",
    playList: "codigoSpoti"
  }]

  constructor() { }

  enviarCancion(cancion:any,lugarID:string,userID:string){
    let today = new Date();
    let cancionEnviar = {
      lugarID: lugarID,
      userID: userID,
      cancion : cancion,
      FechaEnvio:  new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()),
      estado: "Enviada"
    }


    this.playListLugarSV.push(cancionEnviar);
    this.playListLugarUser.push(cancionEnviar);

  }

  getCancionesSV(lugarID:string,orden:string,col:string){
    let cancionesLugar:any[] = this.playListLugarSV.filter(
      function(data){
        return data.lugarID == lugarID
      }
    );

    //ordenar y agrupar
    return cancionesLugar.sort(function(a,b) {
    return new Date(b.FechaEnvio).getTime() - new Date(a.FechaEnvio).getTime()
    });
  }

  validarCancion(cancionID:string,lugarID:string,playlist:any){
      let cancionesLugar:any[] = this.playListLugarSV.filter(
        function(data){
          return data.lugarID == lugarID
        }
      );

      let cancionEnviar:any[]  = cancionesLugar.filter(
        function(data){
          return data.cancion.id == cancionID
        }
      );

      let cancionValidar = cancionEnviar[0];
      cancionValidar.playlist = playlist;
      this.playListLugarV.push(cancionValidar);
      //TODO Enviar a lista Spotify
      //TODO borrar todas las canciones del lugar en la listaSV
      //TODO cambiar estado cancion playListLugarUser a todos los usuarios del lugar si estado es ENVIADA a ACEPTADA
  }

  rechazarCancion(cancionID:string,lugarID:string,userID?:any){
    let cancionesLugar:any[] = this.playListLugarSV.filter(
      function(data){
        return data.lugarID == lugarID
      }
    );

    let cancionEnviar:any[]  = cancionesLugar.filter(
      function(data){
        if(userID === undefined) {
        return data.cancion.id == cancionID;
      }else{
        return data.cancion.id == cancionID && data.userID == userID;
      }

      }
    );

    //TODO borrar todas las canciones del lugar en la listaSV
    //TODO cambiar estado cancion playListLugarUser a todos los usuarios del lugar si estado es ENVIADA a RECHAZAR

  }


}
