import { Component, OnInit, Input,AfterViewChecked } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {FriendsService} from '../../services/friends.service';
import  {ChatService} from "../../services/chat.service";

/*import {
    HandyOauthStorageKeys,
    HandyOauthUserDataInterface,
    HandyOauthStorageService,
    HandyOauthConfigProvidersService,
    HandyOauthProvidersController
}  from 'ng2-handy-oauth';*/


@Component({
  selector: 'app-menu-aside',
  styleUrls: ['./menu-aside.component.css'],
  templateUrl: './menu-aside.component.html'
})
export class MenuAsideComponent implements AfterViewChecked, OnInit {
  private currentUrl: string;
  private currentUser: User = new User();
public providers: string[];
  @Input() private links: Array<any> = [];

amigos:any[]=[];
conversacion:any[]=[];
mensaje:string="";
elemento:any;
idUserTo:string="";
open:string="1";
  constructor(public _cs:ChatService,private userServ: UserService,private _friendsService:FriendsService, public router: Router/*,        private oauthProvidersController: HandyOauthProvidersController,
        private oauthConfigServ: HandyOauthConfigProvidersService,
        private storageServ: HandyOauthStorageService*/) {
    // getting the current url
    this.router.events.subscribe((evt) => this.currentUrl = evt.url);
    this.userServ.currentUser.subscribe((user) => this.currentUser = user);
    if(localStorage.getItem('userJB')){
      this._cs.cargarMensajes().subscribe( snapshots  =>

          this.conversacion = snapshots


      );
      //setTimeout( () => this.elemento.scrollTop = this.elemento.scrollHeight,100);

    _friendsService.getFriendsUser(localStorage.getItem('userJB')).subscribe(
     data => {
       this.amigos = data.friends;
      // this.getUsers();
     }

   );
    }

  }

  public ngOnInit(){
    setInterval(() => {
      this._friendsService.getFriendsUser(localStorage.getItem('userJB')).subscribe(
       data => {
         this.amigos = data.friends;
         //this.getUsers();
       }

     );


    }, 1000);
  }

  public ngAfterViewChecked() {
      this.elemento = document.getElementById("chatMensajes");

  }

  enviar(){
    this.scrollDown();
    if(this.mensaje.length==0){
      return false;
    }

    let obj = JSON.parse(localStorage.getItem('profile'));
    this._cs.agregarMensaje(this.mensaje,obj.name,this.idUserTo)
    .then( () => console.log('OK'))
    .catch( (error) => console.error(error));


    this.mensaje="";
  }

  filtrarMensajes(userSel:string){

    //this.chats.filter('59454c27e31c2106b8fb7834',2);
 return this.conversacion.filter(function(el){

   return (el.idUser == userSel || el.idUserTo == userSel) && (el.idUserTo==localStorage.getItem('userJB') || el.idUser==localStorage.getItem('userJB'));
 });
    //console.log('antes',this.chats);
  //  console.log('hola');
    //return this.chats.map((teams: any[]) => teams.find((team: any) => team.idUser === '59454c27e31c2106b8fb7834'));
    //return this.chats;
  }

isUserSel(userChatFrom:string,userChatTo:string,userSel:string){
  if( (userChatFrom == userSel || userChatTo == userSel) && (userChatFrom==localStorage.getItem('userJB') || userChatTo == localStorage.getItem('userJB')))
    return true;
  else
    return false;

}
  scrollDown(){
    //console.log(amigo);
    //this.idUserTo = userID;
    this.elemento.scrollTop = this.elemento.scrollHeight + 20;
  }

  openChat(userID:string){
    this.idUserTo = userID;
    //filtrar usuario DESDE Y A
    this.scrollDown();
    this.verClases();
  }

  verClases(){
    console.log(this.open);
    if(this.open == "1")
    this.open="0";
    else
    this.open="1";
  }

  getImageUser(){
    let obj = JSON.parse(localStorage.getItem('profile'));
    return obj.picture;
  }
  public connected(){
    if(localStorage.getItem('userJB')){
      return true;
    }else
    {
      return false;
    }
  }

  getImageFriend(idUser:string){
      let amigo = this.amigos.filter(function(el){
        return el.friendID._id == idUser;
      });
      return amigo[0]['friendID']['avatarUrl'];
  }

  isUser(user: string){
    if(user==localStorage.getItem('userJB')){
      return true;
    }else{
      return false;
    }
  }

  fecha(fecha_:string){
    return Date.parse(fecha_);
  }
/*
  public loginSpotify(): void {
      let prueba =  localStorage.getItem('id_token');
      this.userServ.setToken(prueba);
      console.log(this.userServ.getToken());
      //console.log(prueba);
      this.oauthProvidersController.login('spotify');

  }

  protected top(): void {
    setTimeout(() => {
        window.scrollTo(0,0);
    }, 200);
}

protected block(): void {
    // for the logged-in user you can block this view ...
    // let data: HandyOauthUserDataInterface = this.storageServ.get(HandyOauthStorageKeys.DATA);
    // if (data) {
        // redirect somewhere ...
    // }
}

protected getNamesProviders(): void {
    this.providers = this.oauthConfigServ.getNamesProviders();
}*/

}
