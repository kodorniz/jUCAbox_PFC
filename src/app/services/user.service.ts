import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import {Auth} from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { HttpModule, Http,RequestOptions,Headers } from '@angular/http';

@Injectable()
export class UserService {







    public currentUser: ReplaySubject<User> = new ReplaySubject<User>( 1 );
    public Usuario:User;
    public thing:any;
    public token:any;

    public UsuarioReal:any[]=
      [{
      userID: 'google-oauth2|113690553810319532231' ,
      firstname: "nombre",
      lastname: "apellido1",
      email: "email",
      avatarUrl: '',
      creationDate: '',
      preferredLang: '',
      connected: null,
      clientID: '',
      GlobalClientID: '',
      ciudad: '',
      provincia: '',
      pais: '',
      nickName: '',
      _id:''
    }];


    constructor(
      private router: Router,
      private userServ:Auth,
      public authHttp: AuthHttp,
      private _http:Http
    ) {
      // TODO
    }

    public setToken(token){
      this.token = token;
    }

    public getToken(){
      return this.token;
    }
    public setCurrentUser( user: User ) {
      this.currentUser.next( user );
    }

    public getCurrentUser(){
          //this.userServ.currentUser.subscribe((user: User) => this.Usuario = user);
          return localStorage.getItem('userJB');
    }

    public getUserInf(userID:string){
      return this._http
          .get('/api/getUserByID/' + userID)
          .map(res =>res.json());
    }


    public completeUser(Usuario:User){


      return this._http
          .get('/api/getUserByID/' + Usuario.userID)
          .map(res =>{

            return res.json()
          });



    }


    public logout() {

      let user = new User();
      user.connected = false;
      this.setCurrentUser( user );
      this.router.navigate(['login']);
    }

    public getTokenApi(){


      //return this._http.post('https://sergioruiz.eu.auth0.com/oauth/token',body,options).map((response: Response) => response.json());
      let token =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFrSTNSamM1TlVJME9EQTVRalEzT1RZMlFUWTNNams0T1VRMU4wWkdOVFE1TkVNMlJqVTRSUSJ9.eyJpc3MiOiJodHRwczovL3Nlcmdpb3J1aXouZXUuYXV0aDAuY29tLyIsInN1YiI6ImNwTXI0cTBMU0VVQjgwdlFWOFJybENJVjdERll3NGpjQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3Nlcmdpb3J1aXouZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJleHAiOjg3ODkzNzE2NTQ1LCJpYXQiOjE0OTM3MTY1NDUsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIn0.Nx7mfcmLpiT2zfvdHVbGZF-kKeQDteCB_9O9VAsqg3GRk9jXYB8HH_LYhkeV9jmM4pZQYyBc2hz8NW5TUYCEGMfYrYjyX5q9F7DMpGa6oNA3Rzq9jg-zy3kQkyvzDg-QRLJ-PD1qJNZcrWTLsVL7nXR-y-q2-tIG82ieg_5RvBxGyWKi-P4LCvj9vrjYbFCla_em5QStucSmmbHECUvYJsnCINr1K1A-tudsT39gVWW4pWwBDoeCTjNur7J9qabYwlie_lfRvtyzAOMBsrCHc8b2FdbP_ZOu_OUB1aEDGXw2TfK28YZsZgTjYd-KHZPWvv_h2ITjbYlPG94DGt7k5w";
      return token;
    }


    public getUserId(UserID:string){

      let usuarios:any;
      let usuarioF;


     this.getUsers().subscribe(
           data =>{
              usuarioF = data.json();

           }
         );

  /*       console.log(usuarioF);
      return usuarioF.filter(
        function(data){
          return data['userID'] == UserID;
        }

      )*/
      }



    getUsers(){
/*
      this.authHttp.get('https://sergioruiz.eu.auth0.com/api/v2/users')
            .subscribe(
              data => this.thing = data,
              err => console.log(err),
              () => console.log('Request Complete')
            );
      console.log('thing',this.thing);
*/
    let authToken = this.getTokenApi();

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });
    return this._http
      .get('https://sergioruiz.eu.auth0.com/api/v2/users',options)
      .map(res => res);
    }
}


/*

var options = { method: 'POST',
  url: 'https://sergioruiz.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { grant_type: 'client_credentials',
     client_id: 'bgbQ4SXSKq74fripNxkrMp24k2GF6409',
     client_secret: 'Jq51Ixy0UQgbQ6h71l0gfYL7TH1t6faLU3MV4eq2ln8-2At5dFqgUH3lJNGt8KMh',
     audience: 'https://sergioruiz.eu.auth0.com/api/v2/' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
*/
