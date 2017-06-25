import { Injectable } from '@angular/core';
import { JucaboxService } from './jucabox.service';
declare var swal: any;

@Injectable()
export class PlayerService {

  devices_:any[]=[];
  deviceSeleccionado:any="";
  cancionRep:any={
    name:"",
    images:"",
    uri:"",
    artista:"",
    index:""
  };
  playlistSeleccionada:any="";
  lengthPLSeleccionada:any=0;
  constructor(  private _jucaboxService:JucaboxService) { }




  setDevice(device:any){

    this.deviceSeleccionado=device;
  }
  setLengthPL(length_:any){
    this.lengthPLSeleccionada = length_;
  }

  getLengthPL(){
    return this.lengthPLSeleccionada;
  }

  setPlaylist(playlist:any){
    this.playlistSeleccionada=playlist;
  }


  getPlaylist(){
    return this.playlistSeleccionada;
  }




  setCancionRep(cancion:any,index:any){

    this.cancionRep={
      name:cancion.track.name,
      images:cancion.track.album.images,
      uri:cancion.track.uri,
      artista:cancion.track.artists[0].name,
      index:index
    }
    ;
  }

  setCancionRepSP(cancion:any){
    this.cancionRep={
      name:cancion.name,
      images:cancion.images,
      uri:cancion.uri,
      artista:cancion.artista,
    index:cancion.index
    }
    ;
  }


  getCancionRep(){

    return this.cancionRep;
  }

  getDevice(){
    return this.deviceSeleccionado;
  }
  close(){

    this.deviceSeleccionado="";
    this.cancionRep={
      name:"",
      images:"",
      uri:"",
      artista:"",
      index:""
    };
    this.playlistSeleccionada="";
    this.lengthPLSeleccionada=0;

  }

  playSongDevice(){




      this._jucaboxService.playSongDevice(this.deviceSeleccionado,this.playlistSeleccionada,this.cancionRep.index).subscribe();
  //  }

  }



  pauseSongDevice(){
    this._jucaboxService.pauseSongDevice(this.deviceSeleccionado).subscribe();

  }

  nextSongPL(){
    let index_ = this.cancionRep.index;
    console.log('nextSongPL',this.cancionRep.index+1);
    console.log('length',this.lengthPLSeleccionada);
    if(this.cancionRep.index+1==this.lengthPLSeleccionada)
          this._jucaboxService.getTrackPlaylists(this.playlistSeleccionada,0).subscribe(data=>{
            this.cancionRep={
              name:data.items[0].track.name,
              images:data.items[0].track.album.images,
              uri:data.items[0].track.uri,
              artista:data.items[0].track.artists[0].name,
              index:0}

                this._jucaboxService.playSongDevice(this.deviceSeleccionado,this.playlistSeleccionada,this.cancionRep.index).subscribe();
          }

          );
    else
          this._jucaboxService.getTrackPlaylists(this.playlistSeleccionada,this.cancionRep.index+1).subscribe(data=>
            {
              this.cancionRep={
                name:data.items[0].track.name,
                images:data.items[0].track.album.images,
                uri:data.items[0].track.uri,
                artista:data.items[0].track.artists[0].name,
                index:index_+1}
                  this._jucaboxService.playSongDevice(this.deviceSeleccionado,this.playlistSeleccionada,this.cancionRep.index).subscribe();
              });

  }

  prevSongPL(){
    let index_ = this.cancionRep.index;


    if(this.cancionRep.index-1==-1)
          this._jucaboxService.getTrackPlaylists(this.playlistSeleccionada,this.lengthPLSeleccionada-1).subscribe(data=>{
            this.cancionRep={
              name:data.items[0].track.name,
              images:data.items[0].track.album.images,
              uri:data.items[0].track.uri,
              artista:data.items[0].track.artists[0].name,
              index:this.lengthPLSeleccionada-1}

                this._jucaboxService.playSongDevice(this.deviceSeleccionado,this.playlistSeleccionada,this.cancionRep.index).subscribe();
          }

          );
    else
          this._jucaboxService.getTrackPlaylists(this.playlistSeleccionada,this.cancionRep.index-1).subscribe(data=>
            {
              this.cancionRep={
                name:data.items[0].track.name,
                images:data.items[0].track.album.images,
                uri:data.items[0].track.uri,
                artista:data.items[0].track.artists[0].name,
                index:index_-1}
                  this._jucaboxService.playSongDevice(this.deviceSeleccionado,this.playlistSeleccionada,this.cancionRep.index).subscribe();
              });

  }


}
