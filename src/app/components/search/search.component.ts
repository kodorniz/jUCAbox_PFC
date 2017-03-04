import { Component, OnInit } from '@angular/core';
import { JucaboxService } from '../../services/jucabox.service';
import { SinfotoPipe } from '../../pipes/sinfoto.pipe';


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

  constructor(private _jucaboxService:JucaboxService) { }

  ngOnInit() {



  }

  buscarArtista(){
    this._jucaboxService.getArtistas(this.termino)
    .subscribe();
  }


}
