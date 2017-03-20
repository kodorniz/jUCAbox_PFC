import { Component, OnInit } from '@angular/core';
import {Auth} from '../../services/auth.service';
import { User } from '../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.css']
})
export class UsuarioComponent implements OnInit {

    //perfil: Object;
    forma: FormGroup;
    private Usuario:User;
    mostrarboton:boolean = false;
    constructor( private userServ:Auth) {
      this.userServ.currentUser.subscribe((user: User) => this.Usuario = user);
      this.forma = new FormGroup({
      'nombre': new FormControl(this.Usuario.firstname,[Validators.required,Validators.minLength(3)]),
      'apellidos': new FormControl(this.Usuario.lastname,[Validators.required,Validators.minLength(3)]),
      'email': new FormControl(this.Usuario.email,[Validators.required, Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$")]),
      'avatar': new FormControl(this.Usuario.avatarUrl),
      'preferredLang': new FormControl(this.Usuario.preferredLang,Validators.required),
      'ciudad': new FormControl(this.Usuario.ciudad),
      'provincia': new FormControl(this.Usuario.provincia),
      'pais': new FormControl(this.Usuario.pais),
      'nickname': new FormControl(this.Usuario.nickName,Validators.required)
    //  'apellido': new FormControl('',Validators.required),
    //  'correo': new FormControl('',[Validators.required, Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$")]),
    });
    //this.Usuario = this.auth.getProfileComplete("1");
    //console.log(this.perfil);
  }

  ngOnInit() {
  }

  guardarCambios(){
    this.Usuario.setUser(this.forma.value,this.userServ.getProfile());
  }
  valorboton(){
    console.log(this.mostrarboton);
  }
}
