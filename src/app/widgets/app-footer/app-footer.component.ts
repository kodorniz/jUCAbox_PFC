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
                 if(this._playerService.getPlaylist()){
                        this._jucaboxService.getTracksPlaylists(this._playerService.getPlaylist()).subscribe(
                          data2=>{
                            let position;

                            for(let i=0;i<data2.total;i++){
                              if(data2.items[i].track.uri ==data.item.uri){
                                position=i;
                              }
                            }

                            console.log('posicion',position);
                            let cancionRep ={
                             name: data.item.name,
                             images: data.item.album.images,
                             uri: data.item.uri,
                             artista: data.item.artists[0].name,
                             index: position
                            }
                            //console.log('cancion',cancionRep);

                            this._playerService.setDevice(data.device.id);

                            this._playerService.setCancionRepSP(cancionRep);
                          }

                        )
                      }else{

                      }







                }
                //  console.log(  'ahora sonando',this._playerService.getCancionRep());


             )



           }, 5000);
      }

}
