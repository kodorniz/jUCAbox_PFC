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
  private lugaresAdmin:any[]=[];
  private lugaresFav:any[]=[];
  termino:string = "";
  ciudad:string="";
  provincia:string="";
  busquedaAvanzada:boolean = false;
  menuState:string = 'out';
  usuarioID:string = "";
  chkAdmin:boolean = false;
  tipoMusica:Array<IOption>;


  tipoMusicaValores:Array<IOption> = [
       {value: '0', label: 'Pop'},
       {value: '1', label: 'Dance'},
       {value: '2', label: 'Reggaeton'},
       {value: '3', label: 'Rock'}
   ];
  constructor(private _lugaresService:LugaresService, private _notificationService: NotificationsService, private _usuarioService: UserService, private _Auth:Auth ) {
    this.usuarioID = localStorage.getItem('userJB');
    this.chkAdmin = false;

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

  this._lugaresService.getLugaresNombre(this.termino,this.provincia,this.ciudad,String(this.tipoMusica),localStorage.getItem('userJB'),this.chkAdmin).subscribe(
      data=>{

        this.lugares = data.lugares;

      }
    );

    this._lugaresService.getLugaresAdmin(localStorage.getItem('userJB')).subscribe(
        data=>{

          this.lugaresAdmin = data.lugares;

        }
      );

      this._lugaresService.getLugaresFav(localStorage.getItem('userJB')).subscribe(
          data=>{

            this.lugaresFav = data.lugares;

          }
        );


  }

  getImage(url:string){

    return '/api/get-image-lugar/' + url;
  }



  getLugaresNombre(){

    this._lugaresService.getLugaresNombre(this.termino,this.provincia,this.ciudad,String(this.tipoMusica),localStorage.getItem('userJB'),this.chkAdmin).subscribe(
      data=>{

        this.lugares = data.lugares;
      }
    );

  }

  getLugaresNombreChk(){
    this.chkAdmin = !this.chkAdmin;
    console.log(this.chkAdmin);
    this._lugaresService.getLugaresNombre(this.termino,this.provincia,this.ciudad,String(this.tipoMusica),localStorage.getItem('userJB'),this.chkAdmin).subscribe(
      data=>{

        this.lugares = data.lugares;
      }
    );

  }

  isFav(lugarID:string){


    let fav = this.lugaresFav.filter(function (value) {
        return value.lugarID==lugarID;
    });

    if(fav.length == 0){
      return false;
    }else{
      return true;
    }

  }

  addFav(id:string,userID:string,nombre:string){


    if(!this.isFav(id)){
          this._lugaresService.addFav(id,userID).subscribe();
          this._notificationService.success( nombre,"Añadido a favoritos correctamente");

          this._lugaresService.getLugaresFav(localStorage.getItem('userJB')).subscribe(
              data=>{

                this.lugaresFav = data.lugares;

              }
            );
      }else{
        this._lugaresService.removeFav(id,userID).subscribe();
        this._notificationService.success(nombre,"Eliminado de favoritos");
        this._lugaresService.getLugaresFav(localStorage.getItem('userJB')).subscribe(
            data=>{

              this.lugaresFav = data.lugares;

            }
          );
      }



  }

}
