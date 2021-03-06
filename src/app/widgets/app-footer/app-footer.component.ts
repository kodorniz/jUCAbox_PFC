import { Component, Input,OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { JucaboxService } from '../../services/jucabox.service';


@Component( {
    selector: 'app-footer',
    styleUrls: ['./app-footer.component.css'],
    templateUrl: './app-footer.component.html'
})
export class AppFooterComponent {

    isplaying:boolean=false;
    constructor(private _jucaboxService:JucaboxService,public _playerService:PlayerService) {

    }



    ngOnInit() {

      if(this.isLoginSpotify()){
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

                            if(position){
                            let cancionRep ={
                             name: data.item.name,
                             images: data.item.album.images,
                             uri: data.item.uri,
                             artista: data.item.artists[0].name,
                             index: position
                            }

                            if(data.device.id && !this._playerService.getDevice()){


                              this._playerService.setDevice(data.device.id);
                            }

                            this._playerService.setCancionRepSP(cancionRep);
                          }
                          }

                        )
                      }else{

                      }







                }
                //  console.log(  'ahora sonando',this._playerService.getCancionRep());


             )


             this._jucaboxService.getStatusPlayer().subscribe(

               data => {
                 this.isplaying = data.is_playing;
               }
             );
           }, 1000);
         }
      }

      public isLoginSpotify(){
        if (localStorage.getItem('id_token_spotify'))
          return true;
        else
        return false;
      }

}
