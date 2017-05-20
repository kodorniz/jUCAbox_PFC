import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LugaresService } from '../../services/lugares.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html'
})
export class LugarComponent {

  lugar:any = {};

constructor( private activatedRoute:ActivatedRoute,
            private _lugaresService: LugaresService,
            private router:Router
              ) {

  this.activatedRoute.params.subscribe( params => {

    this.lugar = this._lugaresService.getLugar(params['id']);

  })

 }



 volverLugares(){
   this.router.navigate(['/lugares']);
 }



}
