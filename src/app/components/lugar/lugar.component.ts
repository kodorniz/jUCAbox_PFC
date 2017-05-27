import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LugaresService } from '../../services/lugares.service';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html'
})
export class LugarComponent {

  lugar:any = {};

  informacionVisible = true;
  playlistVisible = false;
  usuarioVisible = false;
  playlistSV:any[]=[];
    playlistSpoti:any[]=[];
  audio = new Audio();
  cancion:any;
  visiblePlay:boolean = false;
  cancionesTopVisible = false;
constructor( private activatedRoute:ActivatedRoute,
            private _lugaresService: LugaresService,
            private router:Router,
            private _playlistService: PlaylistService
              ) {

                this.router.events.subscribe((event) => {

                  if(event.url) {
                      this.stopCancion();
                  }
                });
  this.activatedRoute.params.subscribe( params => {

    this.lugar = this._lugaresService.getLugar(params['id']);
    this.playlistSV = this._playlistService.getCancionesSV(params['id'],"up","fecha");
  })

 }


ordenaP(){

}

 volverLugares(){
   this.router.navigate(['/lugares']);
 }

visibleInformacion(){
  this.informacionVisible = true;
  this.playlistVisible = false;
  this.usuarioVisible = false;
  this.cancionesTopVisible = false;
}

visiblePlaylist(){
  this.informacionVisible = false;
  this.playlistVisible = true;
  this.usuarioVisible = false;
  this.cancionesTopVisible = false;
}

visibleUsuario(){
  this.informacionVisible = false;
  this.playlistVisible = false;
  this.usuarioVisible = true;
  this.cancionesTopVisible = false;
}

visibleCancionesTop(){
  this.informacionVisible = false;
  this.playlistVisible = false;
  this.usuarioVisible = false;
  this.cancionesTopVisible = true;
}

getCancionesSV(orden:string){
  //this.playlistSV = this._playlistService.getCancionesSV(this.lugar,"up","fecha");
}

deleteCancionSV(){

}

validateCancionSV(){

}

getActualCancion(){
  return this.cancion;
}

sendCancion(cancion){

  this.cancion = cancion;
  this.audio.src =  this.cancion.preview_url;
  this.audio.load();
  this.audio.play();
  this.visiblePlay=true;
}

stopCancion(){
  this.audio.pause();
  this.audio.currentTime = 0;
  this.cancion = null;
}

aceptarCancion(cancion:any){

}
rechazarCancion(cancion:any){

}

}
