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

  public createPlayList(idLugar:string){
    let prueba = this._jucaboxservice.createPlaylist().subscribe(data=>{
      //insertar playlist Lugar
    }
    );
  }

  public result(){
    let prueba = this._jucaboxservice.createPlaylist().subscribe(data=>{
      //insertar playlist Lugar
    }
    );
  }


}
