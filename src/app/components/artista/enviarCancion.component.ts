
import { Component, OnInit,trigger,state, transition, style, animate}  from '@angular/core';
import { NgForm } from '@angular/forms'
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { LugaresService } from '../../services/lugares.service';
import { FormGroup } from '@angular/forms';
import {SelectModule} from 'ng-select';
import { User } from '../../models/user';
import {Auth} from '../../services/auth.service';
import {PlaylistService} from '../../services/playlist.service';
import { NotificationsService } from 'angular2-notifications';
import {LogService} from '../../services/log.service';
import { JucaboxService } from '../../services/jucabox.service';

export class enviarCancion extends BSModalContext {
  termino:string="";
  Lugares:any[]=[];

  lugar_:string="-1";
  token_:string="";
  noFavorito:boolean;
  LugaresFavS2:any[]=[];
  LugaresS2:any[]=[];
  usuarioID:string="";

  private Usuario:User;

  constructor(public Cancion:any,public _lugaresService:LugaresService,   private userServ:Auth,public _playlistService:PlaylistService,public _notificationService?: NotificationsService,public _logService?:LogService,public _jucaboxService?:JucaboxService) {
      super();

      this.userServ.currentUser.subscribe((user: User) => this.Usuario = user);
      this.usuarioID = this.Usuario.getUserID();
      this.LugaresFavS2 = [];
      this.LugaresS2 =[];




  }





  // getLugaresNombre(){
  //   this.Lugares=this._lugaresService.getLugaresNombre(this.termino,'','');
  // }
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'modal-content',

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
  ],
  styles: [`.custom-modal-container {
        }
        .custom-modal-header {
            background-color: #828282;
            color: #fff;
            -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            margin-top: -15px;
            margin-bottom: 40px;
        }
    `],
  //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
  // Remove when solved.
  /* tslint:disable */ template: `
  <div class="box box-info">

            <div class="box-header with-border">
              <h3 class="box-title bottom-30">Enviar <strong>{{context.Cancion.name}}</strong> a...</h3>
              <div *ngIf="context.userServ.authenticated()"   class="row">
              <div class="col-xs-12 top-15">
                <div class="btn-group" role="group" aria-label="...">
                        <button type="button"[ngClass]="{'btn': true,'btn-primary': !this.noFavorito, 'btn-default': this.noFavorito}"  (click)="this.noFavorito=false">Favoritos</button>
                        <button type="button" [ngClass]="{'btn': true,'btn-primary': this.noFavorito, 'btn-default': !this.noFavorito}" (click)="this.noFavorito=true">Todos</button>
                </div>
              </div>
              </div>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal" (ngSubmit)="guardar(forma)" #forma="ngForm" novalidate="novalidate">
              <div class="box-body">
                <!--<div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Lugar</label>
                  <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
                  <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
                  </div>
                </div> -->
                <div>

                </div>
                <div class="form-group " [ngClass]="{'has-error':  !getLugarRelleno()}" *ngIf="context._lugaresService.getLugaresFav(this.getUser()).length!=0 && !this.noFavorito && context.userServ.authenticated()">
                  <label for="lugar" class="col-sm-4 control-label">Seleccione un lugar favorito</label>
                  <div class="col-sm-12">
                  <ng-select  id="lugar"
                  [disabled]="disabled"
                    [options]="context.LugaresFavS2"
                    placeholder="Seleccione un lugar favorito"
                    [allowClear]="true"
                      name="lugar"
                      filterPlaceholder="Puede filtrar por nombre,ciudad o provincia"
                      notFoundMsg="Sin resultado..."
                      (closed)="token_ = getCookie('jucabox token ' + lugar_)"
                      [(ngModel)]="lugar_"

                      #lugar="ngModel"
                    required>
                  </ng-select>
                <!--  <select class="form-control" id="lugar"
                  required
                  name="lugar"
                  (change)="token_ = getCookie('jucabox token ' + lugar_)"
                  [(ngModel)]="lugar_"
                  #lugar="ngModel"
                  >
                    <option  *ngFor="let lugar of context._lugaresService.getLugaresFav()" [value]="lugar.id"><strong>{{lugar.nombre}}</strong> - {{lugar.ciudad}} - {{lugar.provincia}}</option>
                  </select>-->
                  </div>
                </div>
                <div class="form-group " [ngClass]="{'has-error':  !getTokenValido()}" *ngIf="!this.noFavorito && context.userServ.authenticated() && getToken(lugar_)">

                  <label for="lugar" class="col-sm-12 control-label" style="text-align:left;">Token <span *ngIf=" !getTokenValido()"> - El Token es incorrecto</span></label>
                  <div class="col-sm-12">
                  <input type="text" class="col-sm-12 form-control"
                  [(ngModel)]="token_"
                  id="token"
                  type="text" name="token"
                  #token="ngModel"
                  required
                  placeholder="Introduce el token de validación del lugar..."
                  [pattern]="getToken(lugar_)"
                  >
                  </div>
                </div>
              <!--  <div class="form-group " *ngIf="this.noFavorito">

                  <div class="col-sm-12">
                  <input type="text" class="col-sm-12 form-control"
                  [(ngModel)]="termino"
                  type="text" name="termino"
                  placeholder="Introduce nombre ...">
                  </div>
                </div>-->
                <div class="form-group" [ngClass]="{'has-error':  !getLugarRelleno()}" *ngIf="this.noFavorito || !context.userServ.authenticated()">
                <label for="lugar" class="col-sm-4 control-label" style="text-align:left;">Buscar lugar</label>
                <div class="col-sm-12">
                <ng-select  id="lugar2"

                  [options]="context.LugaresS2"
                  placeholder="Seleccione un lugar"
                  [allowClear]="true"
                  filterPlaceholder="Puede filtrar por nombre,ciudad o provincia"
                    name="lugar"
                    notFoundMsg="Sin resultado..."
                    (closed)="token_ = getCookie('jucabox token ' + lugar_)"
                    [(ngModel)]="lugar_"
                    #lugar2="ngModel"
                  required>
                </ng-select>
                <!--<select class="form-control" id="lugar2"
                required
                name="lugar"
                [(ngModel)]="lugar_"
                (change)="token_ = getCookie('jucabox token ' + lugar_)"
                #lugar2="ngModel"
                >
                  <option value="0" *ngIf="context._lugaresService.getLugaresNombreT(termino).length==0">Sin resultados...</option>
                  <option  *ngFor="let lugar of context._lugaresService.getLugaresNombreT(termino)" [value]="lugar.id"><strong>{{lugar.nombre}}</strong> - {{lugar.ciudad}} - {{lugar.provincia}}</option>
                </select>-->
                </div>
                </div>
                <div  class="form-group " [ngClass]="{'has-error':  !getTokenValido()}" *ngIf="(this.noFavorito || !context.userServ.authenticated()) && getToken(lugar_)">
                  <label for="lugar" class="col-sm-12 control-label" style="text-align:left;">Token <span *ngIf=" !getTokenValido()"> - El Token es incorrecto</span></label>
                  <div class="col-sm-12">
                  <input type="text" class="col-sm-12 form-control"
                  type="text" name="token"
                  placeholder="Introduce el token de validación del lugar..."
                  [pattern]="getToken(lugar_)"
                  required
                  [(ngModel)]="token_"
                  #token2="ngModel"
                  >
                  </div>
                </div>
              </div>
              <!-- /.box-body -->
              <div class="box-footer">
                <button type="submit" class="btn btn-default" (click)="this.dialog.close();">Cancel</button>
                <button type="submit" class="btn btn-success pull-right" (click)="enviarCancionOK(lugar_,token_,forma);">Enviar</button>
              </div>
              <!-- /.box-footer -->
            </form>
          </div>
`
})
export class AdditionalWindow implements ModalComponent<enviarCancion> {
  context: enviarCancion;

  public wrongAnswer: boolean;
  tokenRelleno:boolean=true;
  tokenValido: boolean=true;
  lugarRelleno:boolean=true;
  menuState:string = 'out';
  disabled = true;
  disabled2 = true;
  lugares:any[]=[];
  constructor(public dialog: DialogRef<enviarCancion>) {

    this.disabled = true;
    this.context = dialog.context;
    this.wrongAnswer = true;


    if(localStorage.getItem('userJB')){
    this.context._lugaresService.getLugaresFavP(localStorage.getItem('userJB')).subscribe(data=>{
       this.context.LugaresFavS2=[];
      for( let lugar of data.lugares){

             this.context.LugaresFavS2.push({value: lugar.lugarID._id,label: lugar.lugarID.nombre + " - " + lugar.lugarID.provincia + " - " + lugar.lugarID.ciudad});
           }
           this.disabled = false;

           this.context._lugaresService.getLugares().subscribe(data=>{
             this.lugares=[];
             for( let lugar of data.lugares){
                this.lugares.push(lugar);
                   this.context.LugaresS2.push({value: lugar._id,label: lugar.nombre + " - " + lugar.provincia + " - " + lugar.ciudad});
           }
         });


    });
  }else{


    this.context._lugaresService.getLugares().subscribe(data=>{
      this.context.LugaresS2=[];
      this.lugares=[];
      for( let lugar of data.lugares){
        this.lugares.push(lugar);
            this.context.LugaresS2.push({value: lugar._id,label: lugar.nombre + " - " + lugar.provincia + " - " + lugar.ciudad});
    }
    //this.disabled2 = false;
  });
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

  getUser(){
    return this.context.usuarioID;
  }
  getTokenRelleno(){
    return this.tokenRelleno;
  }
  getTokenValido(){
    return this.tokenValido;
  }
   getLugarRelleno(){
      return this.lugarRelleno;
    }

    search(lugarID, myArray){

    for (var i=0; i < myArray.length; i++) {

        if (myArray[i]._id == lugarID) {

            return myArray[i].token;
        }
    }
  }
  getToken(id:string){
    let token = this.search(id,this.lugares);
    if(token)
      return token;
    else
      return null;
    //return this.search(id,this.lugares);

    /*if(id)
     this.context._lugaresService.getToken(id).subscribe(data=>{
       return data.tokenLugar;
     });*/
  }
  onKeyUp(value) {
    this.wrongAnswer = value != 5;

    this.dialog.close();
  }

  imprimeToken(){
    //console.log(this.context.token_) ;
  }




  guardar(forma:NgForm){


      console.log("ngForm",forma);
      console.log("Valor forma",forma.value);
  }

  enviarCancionOK(lugar_:string,token_:string,forma:NgForm){
    this.lugarRelleno=true;
    this.tokenValido=true;

    if(forma.valid){

    this.setCookie("jucabox token " + lugar_,token_,6);
    //Enviar Cancion al Lugar
    this.context._jucaboxService.getArtista(this.context.Cancion.artists[0].id).subscribe(data=>{

      console.log(data);
      if(localStorage.getItem('userJB')){

        this.context._playlistService.enviarCancion(this.context.Cancion,data.id,data.name,data.genres,lugar_,localStorage.getItem('userJB')).subscribe();
      }
      else{
        this.context._playlistService.enviarCancion(this.context.Cancion,data.id,data.name,data.genres,lugar_).subscribe();
      }



    });

    this.dialog.close();
    this.context._notificationService.success( this.context.Cancion.name,"Enviada a validación del local");

   let lugarNombre:any ="";

    this.context._lugaresService.getLugar(lugar_).subscribe(

      data=>{
        lugarNombre= data.lugar.nombre;
        if(localStorage.getItem('userJB'))
        this.context._logService.addLog(localStorage.getItem('userJB'),"Cancion","Canción enviada a la lista de " + lugarNombre,this.context.Cancion.artists[0].name,"Canción " +  this.context.Cancion.name + " enviada","/artista/"+this.context.Cancion.artists[0].id,this.context.Cancion)
        .subscribe();
      }

    );




  }else{

    if (forma.controls['lugar']['errors']) {

              this.lugarRelleno=false;

    }
    if (forma.controls['token']['errors'] || token_ =="" || token_ === null || token_ === undefined) {

              this.tokenValido=false;
      }
    }
  }





  public getCookie(name: string) {

  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");

  if (parts.length == 2) return parts.pop().split(";").shift();
  }

  public deleteCookie(name) {
      this.setCookie(name, "", -1);
  }

  public setCookie(name: string, value: string, expireHours: number, path: string = "") {
      let d:Date = new Date();
      d.setTime(d.getTime() + expireHours * 60 * 60 * 1000);
      let expires:string = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
  }
  beforeDismiss(): boolean {

    return true;
  }

  beforeClose(): boolean {

    return this.wrongAnswer;
  }
}
