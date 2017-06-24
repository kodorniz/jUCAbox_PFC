import { Component, Input,OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { JucaboxService } from '../../services/jucabox.service';

@Component( {
    selector: 'app-footer',
    styleUrls: ['./app-footer.component.css'],
    templateUrl: './app-footer.component.html'
})
export class AppFooterComponent {


    constructor(private _jucaboxService:JucaboxService,public _playerService:PlayerService) {

    }


    ngOnInit() {
           setInterval(() => {

             this._jucaboxService.getStatusPlayer().subscribe(


               data=>{

                 
                  let cancionRep ={
                   name: data.item.name,
                   images: data.item.album.images,
                   uri: data.item.uri,
                   artista: data.item.artists[0].name
                 }
                 //console.log('cancion',cancionRep);

                  this._playerService.setCancionRepSP(cancionRep);
                //  console.log(  'ahora sonando',this._playerService.getCancionRep());
               }

             )



           }, 5000);
      }

}
