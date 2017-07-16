import { Component, OnInit,trigger,state, transition, style, animate} from '@angular/core';
import { LugaresService } from '../../services/lugares.service';
import { UserService } from '../../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import {Auth} from '../../services/auth.service';
import {SelectModule, IOption} from 'ng-select';
import {LogService} from '../../services/log.service';

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
  constructor(private logService: LogService,private _lugaresService:LugaresService, private _notificationService: NotificationsService, private _usuarioService: UserService, private _Auth:Auth ) {
    this.usuarioID = localStorage.getItem('userJB');
    this.chkAdmin = false;
    this._lugaresService.getLugaresNombre(this.termino,this.provincia,this.ciudad,String(this.tipoMusica),localStorage.getItem('userJB'),this.chkAdmin).subscribe(
        data=>{
          console.log(data.lugares);
          this.lugares = data.lugares;

        }
      );

      if(localStorage.getItem('userJB')){
      this._lugaresService.getLugaresAdmin(localStorage.getItem('userJB')).subscribe(
          data=>{

            this.lugaresAdmin = data.lugares;

          }
        );
      }
      if(localStorage.getItem('userJB')){
        this._lugaresService.getLugaresFav(localStorage.getItem('userJB')).subscribe(
            data=>{

              this.lugaresFav = data.lugares;

            }
          );
        }
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
          this._lugaresService.addFav(id,userID).subscribe(data=>{
            this.logService.addLog(localStorage.getItem('userJB'),"Lugar","Lugar añadido a favoritos",nombre,"Se ha añadido a " + nombre + " a sus lugares preferidos.","/lugar/"+id).subscribe()

            this._lugaresService.getLugaresFav(localStorage.getItem('userJB')).subscribe(
                data=>{
                  this.lugaresFav=[];
                  this.lugaresFav = data.lugares;
                  this._notificationService.success( nombre,"Añadido a favoritos correctamente");

                }
              );
          });



      }else{
        this._lugaresService.removeFav(id,userID).subscribe(data=>{
          this.logService.addLog(localStorage.getItem('userJB'),"Lugar","Lugar eliminado de favoritos",nombre,"Se ha eliminado a " + nombre + " de sus lugares preferidos.","/lugar/"+id).subscribe()

          this._lugaresService.getLugaresFav(localStorage.getItem('userJB')).subscribe(
              data=>{
                  this.lugaresFav=[];
                this.lugaresFav = data.lugares;
                this._notificationService.success(nombre,"Eliminado de favoritos");

              }
            );
        });



      }



  }

}
