import { Component, OnInit,ViewContainerRef,trigger,state, transition, style, animate  } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LugaresService } from '../../services/lugares.service';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router'
import { JucaboxService } from '../../services/jucabox.service';
import { PlayerService } from '../../services/player.service';
import { AdditionalWindowPL, crearPlaylist } from './crearPlaylist.component';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {Auth} from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import {IMyDpOptions} from 'mydatepicker';

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
  mensajeVisible = false;
  editar = false;
  //canciones sin validar
  playlistSV:any[]=[];
  playlistSVTOP:any[]=[];
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
  devices_:any[]=[];
  lengthPLSeleccionada:any=0;
  deviceSeleccionado:any="";
  public froala: string = 'My Document\'s Title'
  cancionRep:any={
    name:"",
    images:"",
    uri:"",
    artista:"",
    index:""
  };
  amigos:any[]=[];
  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  mensajeEJemplo = {

    mensaje : "<p>My <strong>Document&#39;s </strong>Title</p><p><br></p><p><img src=\"https://i.froala.com/download/b7abedaead0ded561a349fa8903d2a2e9c1578f9.png?1498672985\" style=\"width: 114px; height: 114px;\" class=\"fr-fic fr-dib\"></p><p><br></p><p><br></p>",

  }

  public fini: Object = { date: { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()} };
  public ffin: Object = { date: { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate()} };
  orderby="maxDate"
  orderOr = "-1"
  public filesToUpload: Array<File>;




constructor(public _playerService:PlayerService,
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

    this._lugaresService.getLugar(params['id']).subscribe(data =>
    this.lugar = data.lugar);

    this._playlistService.getCancionesSV(params['id'],this.orderOr,this.orderby).subscribe(data=>{
      this.playlistSV = data.playlist;
    });

    this.id_ = params['id'];
    this._lugaresService.getLugaresFavL(this.id_).subscribe(
        data=>{

          this.amigos = data.lugares;

        }
      );
    if(this.isLoginSpotify()){
      this.recargarPL();
      this.recargarDevices();
    }
  })

if(this.isLoginSpotify()){
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

 }



 ngOnInit() {
        setInterval(() => {
          this._playlistService.getCancionesSV(this.id_,this.orderOr,this.orderby).subscribe(data=>{
            this.playlistSV = data.playlist;
          });
            if(!this.deviceSeleccionado){
                this.deviceSeleccionado=this._playerService.getDevice();
            }
                this._playerService.setPlaylist(this.playlistSeleccionada);
                this._playerService.setLengthPL(this.lengthPLSeleccionada);


        }, 1000);
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

deleteSong(cancion:any,index:any){

  this._jucaboxService.deleteTrackPlaylist(this.playlistSeleccionada,cancion,index).subscribe(data=> this.getplaylistSeleccionada());
}


  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


showFroala(){
  console.log(this.froala);
}

addMensaje(){
  this._lugaresService.addMensaje(this.id_,this.froala).subscribe(data=>{
    this.froala = '';
  });
}
orderbyCol(columna:string){

  this.orderby = columna;
  this.orderOr = String(Number(this.orderOr)*-1);

  this._playlistService.getCancionesSV(this.id_,this.orderOr,this.orderby).subscribe(data=>{
    this.playlistSV = data.playlist;
  });

}

getImage(url:string){
    return '/api/get-image-lugar/' + url;
}

reordenarDown(cancion:any,index:any){

  this._jucaboxService.changePositionTrackPlaylist(this.playlistSeleccionada,index+1,'D').subscribe(data=> this.getplaylistSeleccionada());
}

eliminarLugar(){
  this._lugaresService.removeLugar(this.id_).subscribe(
    data=>{
      this._lugaresService.removeFavAll(this.id_).subscribe(data=>
        {
          this.router.navigate(['/lugares'])
        });

    }
  );
}

recargarPL(){

 this._playlistService.GetPlaylistsJB(this.id_ ).subscribe(data=>{
   this.playlistsJB = [];
   this.playlistsJB = data.playlist;

   this.playlistsJBcmb=[];

     for(let i=0;i<this.playlistsJB.length;i++){

           this.playlistsJBcmb.push({value: this.playlistsJB[i]['playlistID'],label: this.playlistsJB[i]['namePlaylist']})

     }


 });



}



selectedRow(item:any,index:any){
  if(!this.deviceSeleccionado)
  swal(
    'Oops...',
    'No tiene ningún dispositivo seleccionado',
    'error'
  )
  else{


  this._playerService.setCancionRep(item,index);
  this._playerService.setDevice(this.deviceSeleccionado);
  this._playerService.setPlaylist(this.playlistSeleccionada);
  this._playerService.setLengthPL(this.lengthPLSeleccionada);
  this._playerService.playSongDevice();




  }
}




recargarDevices(){

  this._jucaboxService.getDevicesUser().subscribe(data=>
    {
        this.devices_ =[];
        for(let i=0;i<data.devices.length;i++){

                  this.devices_.push({value: data.devices[i].id,label: data.devices[i].name});
        }


    }

  );

}
getplaylistSeleccionada(){

if(!this.playlistSeleccionada){

  this.playlistSpoti = [];
}else{
  this._playerService.setPlaylist(this.playlistSeleccionada);
  this._jucaboxService.getTracksPlaylists(this.playlistSeleccionada).subscribe(
    data => {
       this.playlistSpoti = data.items;
       this.lengthPLSeleccionada = data.total;

    }
  );
}

}

isConnected(){
  if(localStorage.getItem('userJB'))
    return true
  else
    return false
}

getNombre(amigo:any){

  if(!amigo.firstname ){
    return null;
  }else{
  return amigo.firstname + ' ' + amigo.lastname;
}
}

public isLoginSpotify(){
  if (localStorage.getItem('id_token_spotify'))
    return true;
  else
  return false;
}

public isAdmin(){
  if(localStorage.getItem('userJB'))
        return this.lugar.userID == localStorage.getItem('userJB');
  else
    return false;
}

 volverLugares(){
   this.router.navigate(['/lugares']);
 }

visibleInformacion(){
  this._lugaresService.getLugar(this.id_).subscribe(data =>
  this.lugar = data.lugar);

  this.informacionVisible = true;
  this.playlistVisible = false;
  this.usuarioVisible = false;
  this.cancionesTopVisible = false;
  this.editar = false;
  this.mensajeVisible = false;
}

visiblePlaylist(){
  this.informacionVisible = false;
  this.playlistVisible = true;
  this.usuarioVisible = false;
  this.cancionesTopVisible = false;
  this.editar = false;
  this.mensajeVisible = false;
}

visibleUsuario(){
  this.informacionVisible = false;
  this.playlistVisible = false;
  this.usuarioVisible = true;
  this.cancionesTopVisible = false;
  this.editar = false;
  this.mensajeVisible = false;
}

visibleCancionesTop(){
  this._playlistService.getCancionesSVTOP(this.id_,this.fini,this.ffin).subscribe(data=>{
    this.playlistSVTOP = data.playlist;
    this.informacionVisible = false;
    this.playlistVisible = false;
    this.usuarioVisible = false;
    this.cancionesTopVisible = true;
    this.editar = false;
    this.mensajeVisible = false;
  });

}

visibleEditar(){
  this.informacionVisible = false;
  this.playlistVisible = false;
  this.usuarioVisible = false;
  this.cancionesTopVisible = false;
  this.editar = true;
  this.mensajeVisible = false;
}

visibleMensajes(){
  this.informacionVisible = false;
  this.playlistVisible = false;
  this.usuarioVisible = false;
  this.cancionesTopVisible = false;
  this.editar = false;
  this.mensajeVisible = true;
}

getCancionesSV(orden:string,col:string){
  this._playlistService.getCancionesSV(this.lugar,orden,col).subscribe(data=>{
    this.playlistSV = data.playlist;
  });
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

    if(this.lugar.direccion != null && this.lugar.direccion != '')
      direccion_= this.lugar.direccion + '+' + this.lugar.ciudad + '+' + this.lugar.provincia;
    else
        direccion_= this.lugar.ciudad + '+' + this.lugar.provincia;


  direccion_.replace(' ','+');

  return direccion_;

}

stopCancion(){
  this.audio.pause();
  this.audio.currentTime = 0;
  this.cancion = null;
}

aceptarCancion(cancion:any,cancionCompleta:any){
if(!this.playlistSeleccionada)
{
  swal(
    'Oops...',
    'No tiene ninguna playlist seleccionada',
    'error'
  )
 //alert("no hay playlist seleccionada. 'Cambiar estilo alerta'");
}else{
  this._jucaboxService.addTrackPlaylist(this.playlistSeleccionada,'spotify:track:' + cancion).subscribe(data=> {
    this.getplaylistSeleccionada();

    this._playlistService.validarCancionTOP(cancionCompleta,this.id_,localStorage.getItem('userJB')).subscribe();

    this._playlistService.validarCancion(cancion,this.id_).subscribe();
    this._playlistService.getCancionesSV(this.id_,this.orderOr,this.orderby).subscribe(data=>{
      this.playlistSV = data.playlist;
    });

    this._playlistService.getCancionesSVTOP(this.id_,this.fini,this.ffin).subscribe(data=>{
      this.playlistSVTOP = data.playlist;
    });
    this._playerService.setLengthPL(this._playerService.getLengthPL()+1);
  }
  );
}
}

rechazarCancion(cancion:any){
  this._playlistService.validarCancion(cancion,this.id_).subscribe();
  this._playlistService.getCancionesSV(this.id_,this.orderOr,this.orderby).subscribe(data=>{
    this.playlistSV = data.playlist;
  });
}

crearPlaylist() {

this.modal
.open(AdditionalWindowPL, {context: new crearPlaylist(this.lugar,this.userServ,this._jucaboxService,this._playlistService)} );
//.open(AdditionalWindow, {context: new enviarCancion('',this._lugaresService,this.userServ,this._playlistService)} );
}

}
