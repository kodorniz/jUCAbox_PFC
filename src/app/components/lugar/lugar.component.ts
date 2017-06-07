import { Component, OnInit,ViewContainerRef,trigger,state, transition, style, animate  } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LugaresService } from '../../services/lugares.service';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router'
import { JucaboxService } from '../../services/jucabox.service';
import { AdditionalWindowPL, crearPlaylist } from './crearPlaylist.component';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {Auth} from '../../services/auth.service';

declare var swal: any;

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  animations: [
    trigger('shrinkOut', [
    state('in', style({height: 0})),
    transition('* => void', [
      style({height: '*'}),
      animate(250, style({height: 0,opacity:'0'}))
    ]),
    state('out', style({ height: '*'})),
    transition('void => *', [
      style({height: 0}),
      animate(250, style({height: '*',opacity:'1'}))
    ]),


    ])
    ]
})
export class LugarComponent {

  lugar:any = {};

  informacionVisible = true;
  playlistVisible = false;
  usuarioVisible = false;
  //canciones sin validar
  playlistSV:any[]=[];
  //cancion de la lista de spotify
  playlistSpoti:any=[];
  audio = new Audio();
  cancion:any;
  visiblePlay:boolean = false;
  cancionesTopVisible = false;
  //playlists de spotify
  playlistsSP:any[]=[];
  playlistsJB:any[]=[];
  playlistSeleccionada:any;
  playlistsJBcmb:any[]=[];
  menuState:string = 'out';
  id_:any;


constructor(
 overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
  private _jucaboxService:JucaboxService,
  public userServ:Auth,
            private activatedRoute:ActivatedRoute,
            private _lugaresService: LugaresService,
            private router:Router,
            private _playlistService: PlaylistService

              ) {
                overlay.defaultViewContainer = vcRef;
                this.router.events.subscribe((event) => {

                  if(event.url) {
                      this.stopCancion();
                  }
                });
  this.activatedRoute.params.subscribe( params => {

    this.lugar = this._lugaresService.getLugar(params['id']);
    this.playlistSV = this._playlistService.getCancionesSV(params['id'],"up","fecha");
    this.id_ = params['id'];

    this.recargarPL();

  })


  this._playlistService.GetPlaylistsSP().subscribe(
      data => {
          for(let i=0;i<data.items.length;i++){

              if(data.items[i].owner.id == _jucaboxService.getUserSpotify())
                {

                    this.playlistsSP.push({value: data.items[i].id,label: data.items[i].name});
                }

          }
      }

  );

 }

 public options = {
     position: ["bottom", "left"],
     timeOut: 5000,
     lastOnBottom: true
 }
   toggleMenu() {
     // 1-line if statement that toggles the value:
     this.menuState = this.menuState === 'out' ? 'in' : 'out';
   }

reordenarUp(cancion:any,index:any){

  this._jucaboxService.changePositionTrackPlaylist(this.playlistSeleccionada,index+1,'U').subscribe(data=> this.getplaylistSeleccionada());
}

reordenarDown(cancion:any,index:any){

  this._jucaboxService.changePositionTrackPlaylist(this.playlistSeleccionada,index+1,'D').subscribe(data=> this.getplaylistSeleccionada());
}

recargarPL(){

this.playlistsJB = this._playlistService.GetPlaylistsJB(this.id_ );
this.playlistsJBcmb=[];
  for(let i=0;i<this.playlistsJB.length;i++){

        this.playlistsJBcmb.push({value: this.playlistsJB[i]['playlistID'],label: this.playlistsJB[i]['namePlaylist']})

  }
}
getplaylistSeleccionada(){

if(!this.playlistSeleccionada){

  this.playlistSpoti = [];
}else{

  this._jucaboxService.getTracksPlaylists(this.playlistSeleccionada).subscribe(
    data => {
       this.playlistSpoti = data.items;

    }
  );
}

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

Cdireccion(){
  let direccion_="";
  let ciudad_="";
  let provincia_="";
  if( this.lugar.direccion==null || this.lugar.ciudad==null || this.lugar.provincia==null  ){
      direccion_= '+';
  }else{
      direccion_= this.lugar.direccion + '+' + this.lugar.ciudad + '+' + this.lugar.provincia;

  }
  direccion_.replace(' ','+');
  return direccion_;

}

stopCancion(){
  this.audio.pause();
  this.audio.currentTime = 0;
  this.cancion = null;
}

aceptarCancion(cancion:any){
if(!this.playlistSeleccionada)
{
  swal(
    'Oops...',
    'No tiene ninguna playlist seleccionada',
    'error'
  )
 //alert("no hay playlist seleccionada. 'Cambiar estilo alerta'");
}else{
  this._jucaboxService.addTrackPlaylist(this.playlistSeleccionada,'spotify:track:' + cancion).subscribe(data=> this.getplaylistSeleccionada());
}
}

rechazarCancion(cancion:any){

}

crearPlaylist() {

this.modal
.open(AdditionalWindowPL, {context: new crearPlaylist(this.lugar,this.userServ,this._jucaboxService,this._playlistService)} );
//.open(AdditionalWindow, {context: new enviarCancion('',this._lugaresService,this.userServ,this._playlistService)} );
}

}
