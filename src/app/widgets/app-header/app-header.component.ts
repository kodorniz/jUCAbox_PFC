import { Component, Input } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import {Auth} from '../../services/auth.service';
import {JucaboxService} from '../../services/jucabox.service';

@Component( {
    selector: 'app-header',
    styleUrls: ['./app-header.component.css'],
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  datos:any;
  constructor(private auth: Auth,private _jucaboxservice:JucaboxService
  ) {

    // TODO
  }

 prueba(){
   /* Mover cancion */
   //this._jucaboxservice.changePositionTrackPlaylist('5b3QIrdoDsavKCNUeUPk7k',5,'D').subscribe(data=> console.log('data',data));
   /* Eliminar CANCION A PLAYLIST*/
   //this._jucaboxservice.deleteTrackPlaylist("33lBfi9WMlWQ8wki0c01Yz","spotify:track:3hGfeFrcJ437S6djv5Kq2T").subscribe(data=> console.log('data',data));
   /* AÑADIR CANCION A PLAYLIST*/
   //this._jucaboxservice.addTrackPlaylist("33lBfi9WMlWQ8wki0c01Yz","spotify:track:3hGfeFrcJ437S6djv5Kq2T").subscribe(data=> console.log('data',data));
   /* OBTENER CANCIONES PLAYLIST */
   //this._jucaboxservice.getTracksPlaylists("33lBfi9WMlWQ8wki0c01Yz").subscribe(data=> console.log('data',data));

   /* OBTENER PLAYLISTS USUARIO*/
   //this._jucaboxservice.getPlaylistsUser().subscribe(data=> console.log('data',data));

   /* CREAR PLAYLIST */
   //this._jucaboxservice.createPlaylist('pruebaJucaabox','Esta es la playlist de prueba').subscribe(data=> console.log('data',data));
 }





}
