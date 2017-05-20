import { Component, OnInit,AfterViewChecked,ViewContainerRef,trigger,state, transition, style, animate } from '@angular/core';
import {Auth} from '../../services/auth.service';
import {LogService} from '../../services/log.service';
import { SinfotoPipe } from '../../pipes/sinfoto.pipe';
import {LugaresService} from '../../services/lugares.service';
import {ArtistasService} from '../../services/artistas.service';
import {UserService} from '../../services/user.service';
import { Overlay } from 'angular2-modal';
import {FriendsService} from '../../services/friends.service';
import { FriendDetailService } from '../../services/friend-detail.service';
import { User } from '../../models/user';
import { KeysPipe } from '../../pipes/keys.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { AdditionalWindow, enviarCancion } from '../artista/enviarCancion.component';
import {PlaylistService} from '../../services/playlist.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-amigo-detalle',
  templateUrl: './amigo-detalle.component.html',
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
export class AmigoDetalleComponent implements OnInit {

  visAmigos:boolean = false;
  visInformacionPersonal:boolean = false;
  visArtistasFavoritos:boolean = false;
  visLugaresFavoritos:boolean = false;
  visHistorialAcciones:boolean = true;
  menuState:string = 'out';
  //log:any[];
  //perfil: Object;
  forma: FormGroup;
  private Usuario:User;
  mostrarboton:boolean = false;
  private lugares:any[] = [];
  private artistas:any[] = [];
  audio = new Audio();
  cancion:any;
  visiblePlay:boolean = false;
  users:any[]=[];
  amigos:any[]=[];
  prueba:any;
  usuarioAmigo:User;
  constructor( private router: Router,overlay: Overlay, vcRef: ViewContainerRef,public modal: Modal,private _friendsService:FriendsService,private _friendDetailService:FriendDetailService,private userServ:Auth,private _userServ:UserService,  private logService: LogService, private _lugaresService: LugaresService,private _artistasService: ArtistasService,public _playlistService:PlaylistService,public _notificationService: NotificationsService,public _logService:LogService) {
    //console.log(this._userServ.getTokenApi());
    //this.userServ.currentUser.subscribe((user: User) => this.Usuario = user);
    //this.log = logService.getTotalLog(this.Usuario.GlobalClientID);
    overlay.defaultViewContainer = vcRef;
    this.Usuario = new User(_friendDetailService.getFriend());

    this.Usuario = _userServ.completeUser(this.Usuario);

     this._userServ.getUsers().subscribe(
        data =>{
           let users = data.json();
           this.users = users;
        }
      );


    //console.log(this._userServ.getTokenApi());
    //console.log('sale getokenAPI');

    logService.getLogInit(this.Usuario.userID);

    this.lugares = _lugaresService.getLugaresFav(this.Usuario.userID);
    this.artistas = _artistasService.getArtistasFav(this.Usuario.userID);

    this.forma = new FormGroup({
    'nombre': new FormControl(this.Usuario.firstname,[Validators.required,Validators.minLength(3)]),
    'apellidos': new FormControl(this.Usuario.lastname,[Validators.required,Validators.minLength(3)]),
    'email': new FormControl(this.Usuario.email,[Validators.required, Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$")]),
    'avatar': new FormControl(this.Usuario.avatarUrl),
    'preferredLang': new FormControl(this.Usuario.preferredLang,Validators.required),
    'ciudad': new FormControl(this.Usuario.ciudad),
    'provincia': new FormControl(this.Usuario.provincia),
    'pais': new FormControl(this.Usuario.pais),
    'nickname': new FormControl(this.Usuario.nickName,Validators.required)
  //  'apellido': new FormControl('',Validators.required),
  //  'correo': new FormControl('',[Validators.required, Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$")]),
  });

  //this.Usuario = this.auth.getProfileComplete("1");
  //console.log(this.perfil);
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
  ngAfterViewChecked() {

  this.amigos = this._friendsService.getFriendsUser(this.Usuario.userID,this.users);

  }
  navigateLog(url:any){

  this.router.navigateByUrl(url);
  }


  iconTypeLogin(type:string){
  switch(type){
    case 'twitter':
       return 'fa  fa-twitter';
   case 'google-oauth2':
       return 'fa  fa-google';
   case 'facebook':
       return 'fa  fa-facebook';
   case 'auth0':
           return 'fa fa-lock';
   default:
       return 'fa fa-question';

  }
  }

  guardarCambios(){
  this.Usuario.setUser(this.forma.value,this.userServ.getProfile());
  }
  valorboton(){
  //console.log(this.mostrarboton);
  }

  navigateFriend(userID:string){

  console.log('Antes',this.usuarioAmigo);
  console.log('userID',userID);
  console.log('amigos',this.amigos);
  this.usuarioAmigo = this.amigos.filter(
    function(data){
      return data.user_id == userID;
    }
  )[0];

  this._friendDetailService.pushFriend(this._userServ.completeUser(this.usuarioAmigo));
  this.router.navigateByUrl('/amigo-detalle');
  }

  verAmigos(){
  this.visAmigos = true;
  this.visInformacionPersonal = false;
  this.visArtistasFavoritos = false;
  this.visLugaresFavoritos = false;
  this.visHistorialAcciones = false;
  }

  verInformacionPersonal(){
  this.visAmigos = false;
  this.visInformacionPersonal = true;
  this.visArtistasFavoritos = false;
  this.visLugaresFavoritos = false;
  this.visHistorialAcciones = false;
  }

  verArtistasFavoritos(){
  this.visAmigos = false;
  this.visInformacionPersonal = false;
  this.visArtistasFavoritos = true;
  this.visLugaresFavoritos = false;
  this.visHistorialAcciones = false;
  }

  verLugaresFavoritos(){
  this.visAmigos = false;
  this.visInformacionPersonal = false;
  this.visArtistasFavoritos = false;
  this.visLugaresFavoritos = true;
  this.visHistorialAcciones = false;
  }

  verHistorialAcciones(){
  this.visAmigos = false;
  this.visInformacionPersonal = false;
  this.visArtistasFavoritos = false;
  this.visLugaresFavoritos = false;
  this.visHistorialAcciones = true;
  }

  sendCancion(cancion){
  cancion = cancion.preview_url;
  this.cancion = cancion;
  this.audio.src =  this.cancion;
  this.audio.load();
  this.audio.play();
  this.visiblePlay=true;
  }
  stopCancion(){
  this.audio.pause();
  this.audio.currentTime = 0;
  this.cancion = null;
  this.visiblePlay=false;
  }
  enviarCancion(Cancion) {

  this.modal
  .open(AdditionalWindow, {context: new enviarCancion(Cancion,this._lugaresService,this.userServ,this._playlistService,this._notificationService,this._logService)} );
  }

}
