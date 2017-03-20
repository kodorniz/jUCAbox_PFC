import { Component } from '@angular/core';
import {Auth} from './services/auth.service';
import { User } from './models/user';
//import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
      //private currentUser: User;
      //public currentUser: ReplaySubject<User> = new ReplaySubject<User>( 1 );
  constructor(private userServ: Auth){

    let user = new User(this.userServ.getProfile());
    this.userServ.setCurrentUser(user);


  }
}
