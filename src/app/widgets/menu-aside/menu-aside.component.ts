import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


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
export class MenuAsideComponent implements OnInit {
  private currentUrl: string;
  private currentUser: User = new User();
public providers: string[];
  @Input() private links: Array<any> = [];

  constructor(private userServ: UserService, public router: Router/*,        private oauthProvidersController: HandyOauthProvidersController,
        private oauthConfigServ: HandyOauthConfigProvidersService,
        private storageServ: HandyOauthStorageService*/) {
    // getting the current url
    this.router.events.subscribe((evt) => this.currentUrl = evt.url);
    this.userServ.currentUser.subscribe((user) => this.currentUser = user);
  }

  public ngOnInit() {

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
