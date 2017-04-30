import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JucaboxService } from '../../services/jucabox.service';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { AdditionalWindow, enviarCancion } from './enviarCancion.component';
import { LugaresService } from '../../services/lugares.service';
import {Auth} from '../../services/auth.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent implements OnInit {

  artista:any[]=[];
  cancionesTop:any[]=[];
  textoBusqueda:string;
  cancion:any;
  visiblePlay:boolean = false;
  audio = new Audio();
  termino:string="";

  constructor( private activatedRoute:ActivatedRoute,
               private _jucaboxService:JucaboxService,
               overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
               public _lugaresService:LugaresService,public userServ:Auth
              ) {
                  overlay.defaultViewContainer = vcRef;
              }

  ngOnInit() {
    this.activatedRoute.params.map(
      parametros =>{
        return parametros['id'];
      }
    ).subscribe(id =>{
      //console.log(id);
      this._jucaboxService.getArtista(id).
      subscribe( data => this.artista=data);
//console.log(this.artista);
      this._jucaboxService.getArtistaTop(id).
      subscribe( data =>{
         this.cancionesTop=data;
         this.textoBusqueda="Top Canciones";

       });
    })

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

buscarCanciones(){

    this.activatedRoute.params.map(
      parametros =>{
        return parametros['id'];
      }
    ).subscribe(id =>{
      //console.log(id);
      this.textoBusqueda = "Top Canciones"
      if(this.termino.length == 0){
        this._jucaboxService.getArtistaTop(id).
        subscribe( data =>{
           this.cancionesTop=data;
           this.textoBusqueda="Top Canciones";

         });
    }else{
      this.textoBusqueda = "Canciones"
      this._jucaboxService.getCanciones(this.termino,this.artista['name']).
      subscribe( data => this.cancionesTop=data);
    }



    })

}
  // getActualuri(){
    // return this.cancion.uri;
  // }

  // getActualPrev(){
  // //  this.audio.src =  this.cancion.preview_url;
  //
  //   //console.log(this.audio);
  //   //return this.cancion.preview_url;
  //
  //
  // }

  enviarCancion(Cancion) {

  this.modal
  .open(AdditionalWindow, {context: new enviarCancion(Cancion,this._lugaresService,this.userServ)} );
//  }
// enviarCancion(Cancion) {
//   console.log("click");
  // this.modal.confirm()
  //     .size('sm')
  //     .isBlocking(true)
  //     .showClose(true)
  //     .keyboard(27)
  //     .showClose(true)
  //     .okBtn('Enviar')
  //     .okBtnClass('btn btn-success')
  //     .title('A simple Alert style modal window')
  //     .body(`
  //         <h4>Alert is a classic (title/body/footer) 1 button modal window that
  //         does not block.</h4>
  //         <input type="text" name="lugar">
  //         <b>Configuration:</b>
  //         <ul>
  //             <li>${Cancion.name}</li>
  //             <li><label class="col-form-label">Lugar</label></li>
  //             <input class="form-control"
  //                    type="text"
  //                    placeholder="Discoteca o pub"
  //                    name="Lugar">
  //             <li>Dismissed with default keyboard key (ESC)</li>
  //             <li>Close wth button click</li>
  //             <li>HTML content</li>
  //         </ul>`)
  //     .open();
    }
}
