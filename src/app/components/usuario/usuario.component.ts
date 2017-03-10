import { Component, OnInit } from '@angular/core';
import {Auth} from '../../services/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.css']
})
export class UsuarioComponent implements OnInit {

    perfil: Object;

    constructor( private auth:Auth) {

    this.perfil = this.auth.getProfile();
    console.log(this.perfil);
  }

  ngOnInit() {
  }

}
