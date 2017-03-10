import { Component, OnInit } from '@angular/core';
import {Auth} from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

}
