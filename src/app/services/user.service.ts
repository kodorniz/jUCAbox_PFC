import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import {Auth} from './auth.service';

@Injectable()
export class UserService {
    public currentUser: ReplaySubject<User> = new ReplaySubject<User>( 1 );
    public Usuario:User;
    constructor(
      private router: Router,
      private userServ:Auth
    ) {
      // TODO
    }

    public setCurrentUser( user: User ) {
      this.currentUser.next( user );
    }

    public getCurrentUser(){
          this.userServ.currentUser.subscribe((user: User) => this.Usuario = user);
          return this.Usuario.getUserID();
    }



    public logout() {
      let user = new User();
      user.connected = false;
      this.setCurrentUser( user );
      this.router.navigate(['login']);
    }
}
