import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { JucaboxService } from '../../services/jucabox.service';
import { SinfotoPipe } from '../../pipes/sinfoto.pipe';
import { AdditionalWindow, enviarCancion } from '../artista/enviarCancion.component';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { LugaresService } from '../../services/lugares.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
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

  constructor(private _jucaboxService:JucaboxService,
               overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
              public _lugaresService:LugaresService) {

                overlay.defaultViewContainer = vcRef;
              }

  ngOnInit() {



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
        this.modal.alert()
                  .size('sm')
                  .isBlocking(true)
                  .showClose(true)
                  .keyboard(27)
                  .title('Error')
                  .body('Por favor seleccione al menos una categoria')
                  .open();
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
  .open(AdditionalWindow, {context: new enviarCancion(Cancion,this._lugaresService)} );
  }

  // compruebaCheck(check:string){
  //   if()
  // }
}
