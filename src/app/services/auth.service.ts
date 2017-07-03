// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Router} from '@angular/router';
import { User } from '../models/user';
import { HttpModule, Http,RequestOptions,Headers,URLSearchParams } from '@angular/http';

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

  constructor( private router:Router, private http:Http) {

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
        //comprobar

        this.addUser(user.userID,user);
        this.setCurrentUser( user );
      });
    }

  }
  );
  }

  public existUser(userID){
    return this.http
        .get('/api/getUserByID/' + userID)
        .map(res =>res.json());
  }

  public addUser(userID:string,user:any){


    this.existUser(userID).subscribe(data =>{

      if(data.user.length==0){

        let headers = new Headers({ 'Accept': 'application/json' });

        let options = new RequestOptions({ headers: headers });
        let objeto =
        {
          "userID": userID
          ,"firstname": user.firstname
          ,"lastname": user.lastname
          ,"email": user.email
          ,"avatarUrl": user.avatarUrl
          ,"creationDate": user.creationDate
          ,"preferredLang": user.preferredLang
          ,"clientID": user.clientID
          ,"GlobalClientID": user.GlobalClientID
          ,"ciudad": user.ciudad
          ,"provincia": user.provincia
          ,"pais": user.pais
          ,"nickName": user.nickName
          ,"online": 'yes'
        };
        console.log('objeto',objeto);
        return this.http
          .post('/api/addUser',objeto,options)
          .map(res => {
            console.log(res.json());
            localStorage.setItem('tokenJB',res.json().token);
            localStorage.setItem('userJB',res.json().user._id);
            return res.json();
          }
        ).subscribe();
      }else{

        localStorage.setItem('tokenJB',data.token);
        localStorage.setItem('userJB',data.user[0]._id);

        let authToken = localStorage.getItem('tokenJB');

        let headers = new Headers({ 'Accept': 'application/json' });
        headers.append('Authorization', authToken);

        let options = new RequestOptions({ headers: headers });
        let objeto;
        objeto = {
          online: 'yes'
        }

        return this.http
          .put('/api/updateUser/' + data.user[0]._id,objeto,options)
          .map(res => {
            console.log(res);
            return res.json();
          }).subscribe();


      }
    });



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
    let userJB = localStorage.getItem('userJB');
    let tokenJB = localStorage.getItem('tokenJB');

    localStorage.clear();
    let user = new User();
    user.connected = false;
    this.setCurrentUser( user );
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/home']);

    let authToken = tokenJB;

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers });
    let objeto;
    objeto = {
      online: 'no'
    }

    return this.http
      .put('/api/updateUser/' + userJB,objeto,options)
      .map(res => {
        console.log(res);
        return res.json();
      }).subscribe();




  }


}
