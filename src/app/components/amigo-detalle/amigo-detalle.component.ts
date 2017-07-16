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
import { NotificationsService } from 'angular2-notifications';
import {PlaylistService} from '../../services/playlist.service';
import { JucaboxService } from '../../services/jucabox.service';


@Component({
  selector: 'app-amigo-detalle.component',
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


    //Variables de visibilidad
    visAmigos:boolean = false;
    visInformacionPersonal:boolean = false;
    visArtistasFavoritos:boolean = false;
    visLugaresFavoritos:boolean = false;
    visHistorialAcciones:boolean = true;

    //log:any[];
    //perfil: Object;
    menuState:string = 'out';
    forma: FormGroup;
    private Usuario:any;
    mostrarboton:boolean = false;
    lugares:any[] = [];
    artistas:any[] = [];
    audio = new Audio();
    cancion:any;
    visiblePlay:boolean = false;
    users:any[]=[];
    amigos:any[]=[];
    prueba:any;
    usuarioAmigo:any;
    constructor( private _jucaboxService: JucaboxService,private router: Router,overlay: Overlay, vcRef: ViewContainerRef,public modal: Modal,private _friendsService:FriendsService,private _friendDetailService:FriendDetailService,private userServ:Auth,private _userServ:UserService,  private logService: LogService, private _lugaresService: LugaresService,private _artistasService: ArtistasService,public _playlistService:PlaylistService,public _notificationService: NotificationsService) {
      //console.log(this._userServ.getTokenApi());


      overlay.defaultViewContainer = vcRef;
      //this.userServ.currentUser.subscribe((user: User) => this.Usuario = user);
      this.Usuario = _friendDetailService.getFriend();
        console.log(this.Usuario);
      //this.log = logService.getTotalLog(this.Usuario.GlobalClientID);
       _userServ.completeUser(this.Usuario).subscribe(data=>{
         this.Usuario = data.user[0];

         logService.getLogInit(this.Usuario._id);

          _lugaresService.getLugaresFavP(this.Usuario._id).subscribe(data=>{
            this.lugares = data.lugares;
          });
          _artistasService.getArtistasFav(this.Usuario._id).subscribe(
           data => {

             this.artistas=[];
             for (var _i = 0; _i < data.artistasFav.length; _i++){

               if(data.artistasFav[_i].artistaID!=undefined){
               this._jucaboxService.getArtista(data.artistasFav[_i].artistaID).subscribe(data =>{

                  this.artistas.push(data);
                });
              }


             }



           }

         );


         _friendsService.getFriendsUser(this.Usuario._id).subscribe(
          data => {
            this.amigos = data.friends;
          }

        );
       });

       this._userServ.getUsers().subscribe(
          data =>{
             let users = data.json();
             this.users = users;
          }
        );




      //console.log(this._userServ.getTokenApi());
      //console.log('sale getokenAPI');



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





  }

  getImage(url:string){

    return '/api/get-image-lugar/' + url;
  }
  navigateLog(url:any){
    this.router.navigateByUrl(url);
  }

removeFav(artistaID:string,userID: string,nombreArtista: string){

    this._artistasService.removeFav(artistaID,userID).subscribe();
    this.logService.addLog(localStorage.getItem('userJB'),"Artista","Artista eliminado de favoritos",nombreArtista,"Se ha eliminado a " + nombreArtista + " de sus artistas preferidos.","/artista/"+artistaID).subscribe();

    this._artistasService.getArtistasFav(this.Usuario._id).subscribe(
     data => {

       this.artistas=[];
       for (var _i = 0; _i < data.artistasFav.length; _i++){


         this._jucaboxService.getArtista(data.artistasFav[_i].artistaID).subscribe(data =>{

            this.artistas.push(data);
          });


       }



     }

   );

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

  getActualCancion(){
    return this.cancion;
  }

  getNombre(amigo:any){

    if(!amigo.firstname ){
      return null;
    }else{
    return amigo.firstname + ' ' + amigo.lastname;
  }
  }




  navigateFriend(userID:string){

    this.usuarioAmigo = this.amigos.filter(
      function(data){

        return data.userID == userID;
      }
    )[0];



    this._friendDetailService.pushFriend(this._userServ.completeUser(this.usuarioAmigo))
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
    this.logService.getLogInit(this.Usuario._id);
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
  .open(AdditionalWindow, {context: new enviarCancion(Cancion,this._lugaresService,this.userServ,this._playlistService,this._notificationService,this.logService,this._jucaboxService)} );

}

}
