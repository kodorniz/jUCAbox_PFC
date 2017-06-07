
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


export class crearPlaylist extends BSModalContext {


  lugar:any;
  nueva:boolean=false;
  nombrePlaylist:string="";
  usuarioID:string="";
  playListsUser:any[]=[];
  playlist_:any="";
  nombreNuevaPlayList_:string="";
  private Usuario:User;

  constructor( private lugarCons:any,private userServ:Auth,public _jucaboxService:JucaboxService,public _playlistService: PlaylistService) {
      super();

      this.lugar = lugarCons;
      this.userServ.currentUser.subscribe((user: User) => this.Usuario = user);
      this.usuarioID = this.Usuario.getUserID();
      this._playlistService.GetPlaylistsSP().subscribe(
          data => {
              for(let i=0;i<data.items.length;i++){

                  if(data.items[i].owner.id == _jucaboxService.getUserSpotify())
                    {

                        this.playListsUser.push({value: data.items[i].id,label: data.items[i].name});
                    }

              }
          }

      );




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
              <h3 class="box-title bottom-30">Nueva playlista</h3>
              <div *ngIf="context.userServ.authenticated()"   class="row">
              <div class="col-xs-12 top-15">
                <div class="btn-group" role="group" aria-label="...">
                        <button type="button" [ngClass]="{'btn': true,'btn-primary': !this.nueva, 'btn-default': this.nueva}" (click)="this.nueva=false">Crear nueva</button>
                        <button type="button"[ngClass]="{'btn': true,'btn-primary': this.nueva, 'btn-default': !this.nueva}"  (click)="this.nueva=true">Disponibles</button>

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
                <div class="form-group " *ngIf="context.playListsUser && this.nueva && context.userServ.authenticated()">

                  <label for="lugar" class="col-sm-4 control-label" style="text-align:left;">Seleccione una playlist</label>
                  <div class="col-sm-12">
                  <ng-select  id="lugar"
                    [options]="context.playListsUser"
                    placeholder="Seleccione una playlist"
                    [allowClear]="true"
                      name="playlist"
                      filterPlaceholder="Filtre por nombre"
                      notFoundMsg="Sin resultado..."
                      [(ngModel)]="playlist_"

                      #playlist="ngModel"
                    >
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
              <!--  <div class="form-group " *ngIf="this.noFavorito">

                  <div class="col-sm-12">
                  <input type="text" class="col-sm-12 form-control"
                  [(ngModel)]="termino"
                  type="text" name="termino"
                  placeholder="Introduce nombre ...">
                  </div>
                </div>-->
                <div class="form-group" *ngIf="!this.nueva || !context.userServ.authenticated()">
                <label for="lugar" class="col-sm-4 control-label" style="text-align:left;">Crear Nueva</label>
                <div class="col-sm-12">
                <input type="text" class="col-sm-12 form-control"
                [(ngModel)]="nombreNuevaPlayList_"
                id="token"
                type="text" name="token"
                #nombreNuevaPlayList="ngModel"
                required
                placeholder="Introduce el nombre de la playlist..."
                >

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
              </div>
              <!-- /.box-body -->
              <div class="box-footer">
                <button type="submit" class="btn btn-default" (click)="this.dialog.close();">Cancel</button>
                <button type="submit" class="btn btn-success pull-right" (click)="crearPL(playlist_,nombreNuevaPlayList_,forma);">Añadir</button>
              </div>
              <!-- /.box-footer -->
            </form>
          </div>
`
})
export class AdditionalWindowPL implements ModalComponent<crearPlaylist> {
  context: crearPlaylist;

  public wrongAnswer: boolean;

  playlistRelleno:boolean=true;
  menuState:string = 'out';

  constructor(public dialog: DialogRef<crearPlaylist>) {


    this.context = dialog.context;
    this.wrongAnswer = true;

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

  onKeyUp(value) {
    this.wrongAnswer = value != 5;

    this.dialog.close();
  }




  guardar(forma:NgForm){


      console.log("ngForm",forma);
      console.log("Valor forma",forma.value);
  }

  crearPL(playlist_:string,nuevaPlaylist_:string,forma:NgForm){


    if(forma.valid){
      //crearPL
      if(playlist_){
        let namePlaylist:any = this.context.playListsUser.filter(
          function(data){
            return data.value == playlist_
          }
        )[0].label;
        this.context._playlistService.addPlaylistsJB(this.context.lugar.id,playlist_,namePlaylist,localStorage.getItem('id_user_spotify'));
        //this.context.playlistsJBcmb.push({value: playlist_,label: namePlaylist})
      }

      if(nuevaPlaylist_){

        this.context._jucaboxService.createPlaylist(nuevaPlaylist_,nuevaPlaylist_).subscribe(data=>{
          this.context._playlistService.addPlaylistsJB(this.context.lugar.id,data.id,nuevaPlaylist_,localStorage.getItem('id_user_spotify'));
        });

      //

      }

    this.dialog.close();





  }else{
      console.log('error');
    }
  }








  beforeDismiss(): boolean {

    return true;
  }

  beforeClose(): boolean {

    return this.wrongAnswer;
  }
}
