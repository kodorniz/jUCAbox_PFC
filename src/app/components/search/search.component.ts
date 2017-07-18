import { Component, OnInit,ViewContainerRef,trigger,state, transition, style, animate } from '@angular/core';
import { JucaboxService } from '../../services/jucabox.service';
import { SinfotoPipe } from '../../pipes/sinfoto.pipe';
import { AdditionalWindow, enviarCancion } from '../artista/enviarCancion.component';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { LugaresService } from '../../services/lugares.service';
import {Auth} from '../../services/auth.service';
import {Router} from '@angular/router/src/router';
import {PlaylistService} from '../../services/playlist.service';
import { NotificationsService } from 'angular2-notifications';
import {LogService} from '../../services/log.service';
declare var swal: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
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
export class SearchComponent implements OnInit {
  termino:string = "";
  mostrarCanciones:boolean = true;
  mostrarArtistas:boolean = true;
  mostrarPlaylists:boolean = true;
  mostrarAlbumes:boolean = true;
  audio = new Audio();
  cancion:any;
  visiblePlay:boolean = false;
  chkArtista:boolean = true;
  chkAlbum:boolean = false;
  chkCancion:boolean = true;
  chkPlaylist:boolean = false;
  clickBoton:boolean = false;
    users:any[]=[];
  menuState:string = 'out';
  constructor( private _jucaboxService:JucaboxService,
               overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
              public _lugaresService:LugaresService
            ,public userServ:Auth,
          private router: Router,public _playlistService:PlaylistService,public _notificationService: NotificationsService,public _logService:LogService) {




              this.router.events.subscribe((event) => {

                //console.log(event.url,'lugar');
                if(event.url) {
                    this.stopCancion();
                }
            });
                overlay.defaultViewContainer = vcRef;
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

  ngOnInit() {



  }
  keyDownFunction(event) {
  if(event.keyCode == 13) {
    this.buscarArtista();
    // rest of your code
  }
}

  buscarArtista(){
    let tipo:string = "&type=";
    if(this.chkArtista)
      tipo=tipo+'artist,'
    if(this.chkCancion)
      tipo=tipo+'track,'
    if(this.chkAlbum)
      tipo=tipo+'album,'
    if(this.chkPlaylist)
      tipo=tipo+'playlist,'

      if(!this.chkArtista && !this.chkCancion && !this.chkAlbum && !this.chkPlaylist){
        /*this.modal.alert()
                  .size('sm')
                  .isBlocking(true)
                  .showClose(true)
                  .keyboard(27)
                  .title('Error')
                  .body('Por favor seleccione al menos una categoria')
                  .open();*/
                  swal(
                    'Oops...',
                    'Por favor seleccione al menos una categoria',
                    'error'
                  )
      }else{
    tipo = tipo.substring(0, tipo.length - 1);
    console.log(tipo);
    this._jucaboxService.getArtistas(this.termino,tipo)
    .subscribe(data=>this.clickBoton=true);
    }

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
  getActualCancion(){
    return this.cancion;
  }
  enviarCancion(Cancion) {

  this.modal
  .open(AdditionalWindow, {context: new enviarCancion(Cancion,this._lugaresService,this.userServ,this._playlistService,this._notificationService,this._logService,this._jucaboxService)} );
  }

  // compruebaCheck(check:string){
  //   if()
  // }
}
