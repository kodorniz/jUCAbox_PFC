import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JucaboxService } from '../../services/jucabox.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent implements OnInit {

  artista:any[]=[];
  cancionesTop:any[]=[];
  textoBusqueda:string;

  constructor( private activatedRoute:ActivatedRoute,
               private _jucaboxService:JucaboxService
              ) { }

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

}
