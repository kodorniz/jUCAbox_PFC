import { Component, OnInit,trigger,state, transition, style, animate} from '@angular/core';
import { LugaresService } from '../../services/lugares.service';
import { UserService } from '../../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import {Auth} from '../../services/auth.service';
import {SelectModule, IOption} from 'ng-select';

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
  usuarioID:string = "";
  tipoMusica:Array<IOption>;
  tipoMusicaValores:Array<IOption> = [
       {value: '0', label: 'Pop'},
       {value: '1', label: 'Dance'},
       {value: '2', label: 'Reggaeton'},
       {value: '3', label: 'Rock'}
   ];
  constructor(private _lugaresService:LugaresService, private _notificationService: NotificationsService, private _usuarioService: UserService, private _Auth:Auth ) {
    this.usuarioID = _usuarioService.getCurrentUser();
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

    this.lugares = this._lugaresService.getLugaresNombre(this.termino,this.provincia,this.ciudad,this.tipoMusica);

  }

  addFav(id:string,userID:string,nombre:string){

    if(!this._lugaresService.getFav(id,userID))
      {
          this._lugaresService.addFav(id,userID);
          this._notificationService.success( nombre,"Añadido a favoritos correctamente");
      }else{
        this._lugaresService.removeFav(id,userID);
        this._notificationService.success(nombre,"Eliminado de favoritos");
      }

  }

}
