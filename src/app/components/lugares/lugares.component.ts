import { Component, OnInit,trigger,state, transition, style, animate} from '@angular/core';
import { LugaresService } from '../../services/lugares.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
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
export class LugaresComponent implements OnInit {

  private lugares:any[]=[];
  private lugaresFav:any[]=[];
  termino:string = "";
  ciudad:string="";
  provincia:string="";
  busquedaAvanzada:boolean = false;
  menuState:string = 'out';
  constructor(private _lugaresService:LugaresService, private _notificationService: NotificationsService ) {

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

    this.lugares = this._lugaresService.getLugares();
  }

  getLugaresNombre(){
    this.lugares = this._lugaresService.getLugaresNombre(this.termino,this.provincia,this.ciudad);

  }

  addFav(id:string,nombre:string){
    if(!this._lugaresService.getFav(id))
      {
          this._lugaresService.addFav(id);
          this._notificationService.success( nombre,"añadido a favoritos correctamente");
      }else{
        this._notificationService.error(nombre,"No se puede añadir, ya está añadido");
      }
  }

}
