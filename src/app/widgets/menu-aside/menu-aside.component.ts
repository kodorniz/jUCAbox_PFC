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
export class MenuAsideComponent implements AfterViewChecked {
  private currentUrl: string;
  private currentUser: User = new User();
public providers: string[];
  @Input() private links: Array<any> = [];

amigos:any[]=[];
mensaje:string="";
elemento:any;
  constructor(public _cs:ChatService,private userServ: UserService,private _friendsService:FriendsService, public router: Router/*,        private oauthProvidersController: HandyOauthProvidersController,
        private oauthConfigServ: HandyOauthConfigProvidersService,
        private storageServ: HandyOauthStorageService*/) {
    // getting the current url
    this.router.events.subscribe((evt) => this.currentUrl = evt.url);
    this.userServ.currentUser.subscribe((user) => this.currentUser = user);
    if(localStorage.getItem('userJB')){
      this._cs.cargarMensajes().subscribe( () => console.log("mensajes cargados..."));
      //setTimeout( () => this.elemento.scrollTop = this.elemento.scrollHeight,100);

    _friendsService.getFriendsUser(localStorage.getItem('userJB')).subscribe(
     data => {
       this.amigos = data.friends;
      // this.getUsers();
     }

   );
    }

  }

  public ngAfterViewChecked() {
      this.elemento = document.getElementById("chatMensajes");

  }

  enviar(){
    if(this.mensaje.length==0){
      return false;
    }

    let obj = JSON.parse(localStorage.getItem('profile'));
    this._cs.agregarMensaje(this.mensaje,obj.name)
    .then( () => console.log('OK'))
    .catch( (error) => console.error(error));
    this.elemento.scrollTop = this.elemento.scrollHeight;

    this.mensaje="";
  }

  scrollDown(){
    this.elemento.scrollTop = this.elemento.scrollHeight + 20;
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
