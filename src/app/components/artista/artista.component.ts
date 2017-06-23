import { Component, OnInit,ViewContainerRef,trigger,state, transition, style, animate  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JucaboxService } from '../../services/jucabox.service';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { AdditionalWindow, enviarCancion } from './enviarCancion.component';
import { LugaresService } from '../../services/lugares.service';
import {Auth} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {ArtistasService} from '../../services/artistas.service';
import {LogService} from '../../services/log.service';
import { NotificationsService } from 'angular2-notifications';
import {Router} from '@angular/router/src/router';
import {PlaylistService} from '../../services/playlist.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
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
export class ArtistaComponent implements OnInit {

  artista:any[]=[];
  cancionesTop:any[]=[];
  textoBusqueda:string;
  cancion:any;
  visiblePlay:boolean = false;
  audio = new Audio();
  termino:string="";
  menuState:string = 'out';
  usuarioID:string = "";
  favorito:boolean = false;
  constructor( private activatedRoute:ActivatedRoute,
               private _jucaboxService:JucaboxService,
               overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
               public _lugaresService:LugaresService,public userServ:Auth,
              public _user:UserService,
              public _artistasService:ArtistasService,private _notificationService: NotificationsService,
              public _logService:LogService,
              private router: Router,
              public _playlistService:PlaylistService
              ) {
                  overlay.defaultViewContainer = vcRef;
                  this.usuarioID = _user.getCurrentUser();
                  console.log(this.usuarioID);
                  this.router.events.subscribe((event) => {
                    if(event.url) {
                        this.stopCancion();
                    }
                });


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
    
    this.activatedRoute.params.map(
      parametros =>{
        return parametros['id'];

      }
    ).subscribe(id =>{
      //console.log(id);
      if(localStorage.getItem('userJB')){
      this._artistasService.getFav(id,localStorage.getItem('userJB')).subscribe(data=>{

        if(data.total_items==0){
          this.favorito = false;
        }else{
            this.favorito = true;
        }

      });
    }
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
  userLogged(){

      return this.userServ.authenticated();

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


addFav(artistaID:any,userID:string,nombreArtista:string){

  this._artistasService.getFav(artistaID,userID).subscribe(data=>{

    if(data.total_items==0){
      this._artistasService.addFav(artistaID,userID).subscribe();
      this._notificationService.success( nombreArtista,"Añadido a favoritos correctamente");
      this._logService.addLog(localStorage.getItem('userJB'),"Artista","Artista añadido a favoritos",nombreArtista,"Se ha añadido a " + nombreArtista + " a sus artistas preferidos.","/artista/"+artistaID).subscribe();
      this.favorito = true;
    }else{
      this._artistasService.removeFav(artistaID,userID).subscribe();
      this._notificationService.success(nombreArtista,"Eliminado de favoritos");
      this._logService.addLog(localStorage.getItem('userJB'),"Artista","Artista eliminado de favoritos",nombreArtista,"Se ha eliminado a " + nombreArtista + " de sus artistas preferidos.","/artista/"+artistaID).subscribe();

      this.favorito = false;
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
  .open(AdditionalWindow, {context: new enviarCancion(Cancion,this._lugaresService,this.userServ,this._playlistService,this._notificationService,this._logService)} );
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
