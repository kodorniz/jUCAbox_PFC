// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Router} from '@angular/router';
import { User } from '../models/user';


// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
    public currentUser: ReplaySubject<User> = new ReplaySubject<User>( 1 );

  opciones:Object = {
    allowedConnections: ["Username-Password-Authentication","google-oauth2","facebook","twitter"],
rememberLastLogin: false,
auth: {
                redirectUrl: window.location.origin + '/home',
                responseType: 'token'
            },
socialButtonStyle: "small",
theme: {"logo":"https://cdn.auth0.com/website/playground/schneider.svg","primaryColor":"#3A99D8"},
languageDictionary: {"title":"jUCAbox"},
language: "es"
  };

  // Configure Auth0
  lock = new Auth0Lock('hlSMxuCIadkL65wfSKVktQCaOf9ugoy4', 'sergioruiz.eu.auth0.com',this.opciones);
  userProfile: Object;

  constructor( private router:Router) {

    // Add callback for lock `authenticated` event

    this.lock.on("authenticated", (authResult) => {

      if(authResult.idToken===undefined){

      }
      else{
      /*if(this.userServ.getToken()===undefined){
        console.log("OK");
        localStorage.removeItem('id_token');
      }else{console.log("NOK");
        localStorage.setItem('id_token', this.userServ.getToken());
      }*/
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        let user = new User(profile);
        this.setCurrentUser( user );
      });
    }

  }
  );
  }

 public getProfile():Object{
   if(this.authenticated()){
     return JSON.parse(localStorage.getItem('profile'));
   }else{
     return {};
   }
 }

/* public getProfileComplete(id:string):Object{
   if(this.authenticated()){
     if(id){

     return this.currentUser.filter(
       function(data){ return data.GlobalClientID == id }
     )[0];
   }
   }else{
     return {};
   }
 }*/
  public login() {
    // Call the show method to display the widget.
    this.lock.show();

  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }
  public setCurrentUser( user: User ) {
    this.currentUser.next( user );
  }


  public logout() {

    localStorage.clear();
    let user = new User();
    user.connected = false;
    this.setCurrentUser( user );
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/home']);

  }


}
