
import { Component}  from '@angular/core';
import { NgForm } from '@angular/forms'
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { LugaresService } from '../../services/lugares.service';
import { FormGroup } from '@angular/forms';

export class enviarCancion extends BSModalContext {
  termino:string="";
  Lugares:any[]=[];

  lugar_:string="-1";
  token_:string="";
  noFavorito:boolean;


  EnvioToken:Object = {

  }
  public options: any;

  constructor(public Cancion:any,public _lugaresService:LugaresService) {
      super();


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
              <div class="row">
              <div class="col-xs-12 top-15">
                <div class="btn-group" role="group" aria-label="...">
                        <button type="button" [ngClass]="{'btn': true,'btn-primary': !this.noFavorito, 'btn-default': this.noFavorito}"  (click)="this.noFavorito=false">Favoritos</button>
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
                <div class="form-group " *ngIf="context._lugaresService.getLugaresFav().length!=0 && !this.noFavorito">
                  <label for="lugar" class="col-sm-4 control-label">Seleccione un lugar favorito</label>
                  <div class="col-sm-12">
                  <select class="form-control" id="lugar"
                  required
                  name="lugar"
                  (change)="token = getCookie('jucabox token ' + lugar_)"
                  [(ngModel)]="lugar_"
                  #lugar="ngModel"
                  >
                    <option  *ngFor="let lugar of context._lugaresService.getLugaresFav()" [value]="lugar.id"><strong>{{lugar.nombre}}</strong> - {{lugar.ciudad}} - {{lugar.provincia}}</option>
                  </select>
                  </div>
                </div>
                <div class="form-group " [ngClass]="{'has-error': token.errors?.required  && token.touched && token.errors?.pattern}" *ngIf="!this.noFavorito">
                  <label for="lugar" class="col-sm-12 control-label" style="text-align:left;">Token <span *ngIf="token.errors?.required  && token.touched"> - El Token es necesario</span><span *ngIf="token.errors?.pattern  && token.touched"> - El Token es incorrecto</span></label>
                  <div class="col-sm-12">
                  <input type="text" class="col-sm-12 form-control"
                  [(ngModel)]="token_"
                  id="token"
                  type="text" name="token"
                  #token="ngModel"
                  placeholder="Introduce el token de validación del lugar..."
                  required
                  [pattern]="getToken(lugar_)"
                  >
                  </div>
                </div>
                <div class="form-group" *ngIf="this.noFavorito">
                </div>
                <div class="form-group " *ngIf="this.noFavorito">
                  <label for="lugar" class="col-sm-4 control-label" style="text-align:left;">Buscar lugar</label>
                  <div class="col-sm-12">
                  <input type="text" class="col-sm-12 form-control"
                  [(ngModel)]="termino"
                  type="text" name="termino"
                  placeholder="Introduce nombre ...">
                  </div>
                </div>
                <div class="form-group" *ngIf="this.noFavorito">
                <div class="col-sm-12">
                <select class="form-control" id="lugar2"
                required
                name="lugar2"
                [(ngModel)]="lugar_"
(               change)="token = getCookie('jucabox token ' + lugar_)"
                #lugar2="ngModel"
                >
                  <option value="0" *ngIf="context._lugaresService.getLugaresNombreT(termino).length==0">Sin resultados...</option>
                  <option  *ngFor="let lugar of context._lugaresService.getLugaresNombreT(termino)" [value]="lugar.id"><strong>{{lugar.nombre}}</strong> - {{lugar.ciudad}} - {{lugar.provincia}}</option>
                </select>
                </div>
                </div>
                <div class="form-group " [ngClass]="{'has-error': token2.errors?.required  && token2.touched && token2.pattern }" *ngIf="this.noFavorito">
                  <label for="token" class="col-sm-12 control-label" style="text-align:left;">Token <span *ngIf="token2.errors?.required  && token2.touched"> - El Token es necesario</span><span *ngIf="token2.errors?.pattern  && token2.touched"> - El Token es incorrecto</span></label>
                  <div class="col-sm-12">
                  <input type="text" class="col-sm-12 form-control"
                  type="text" name="token2"
                  placeholder="Introduce el token de validación del lugar..."
                  required
                  [pattern]="getToken(lugar_)"
                  [(ngModel)]="token_"
                  #token2="ngModel"
                  >
                  </div>
                </div>
              </div>
              <!-- /.box-body -->
              <div class="box-footer">
                <button type="submit" class="btn btn-default" (click)="this.dialog.close();">Cancel</button>
                <button type="submit" class="btn btn-success pull-right" (click)="enviarCancionOK(lugar_,token_);">Enviar</button>
              </div>
              <!-- /.box-footer -->
            </form>
          </div>
`
})
export class AdditionalWindow implements ModalComponent<enviarCancion> {
  context: enviarCancion;

  public wrongAnswer: boolean;

  constructor(public dialog: DialogRef<enviarCancion>) {


    this.context = dialog.context;
    this.wrongAnswer = true;

  }
  getToken(id:string){
    return this.context._lugaresService.getToken(id);
  }
  onKeyUp(value) {
    this.wrongAnswer = value != 5;

    this.dialog.close();
  }

  imprimeToken(){
    console.log(this.context.token_) ;
  }




  guardar(forma:NgForm){
      console.log("ngForm",forma);
      console.log("Valor forma",forma.value);
  }

  enviarCancionOK(lugar_:string,token_:string){
    //console.log(this.getCookie("token " + lugar_));
    this.setCookie("jucabox token " + lugar_,token_,6);
    this.dialog.close();

    // let object = {value: token_, timestamp: new Date().getTime()+ (6*60*60*1000)}
    // localStorage.setItem('token_' + lugar_, JSON.stringify(object));
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
