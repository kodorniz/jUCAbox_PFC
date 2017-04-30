import { Component, OnInit } from '@angular/core';
import {Auth} from '../../services/auth.service';
import {LogService} from '../../services/log.service';
import { SinfotoPipe } from '../../pipes/sinfoto.pipe';
import {LugaresService} from '../../services/lugares.service';
import {ArtistasService} from '../../services/artistas.service';
import { User } from '../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.css']
})
export class UsuarioComponent implements OnInit {


    //Variables de visibilidad
    visAmigos:boolean = false;
    visInformacionPersonal:boolean = false;
    visArtistasFavoritos:boolean = false;
    visLugaresFavoritos:boolean = false;
    visHistorialAcciones:boolean = true;
    //log:any[];
    //perfil: Object;
    forma: FormGroup;
    private Usuario:User;
    mostrarboton:boolean = false;
    private lugares:any[] = [];
    private artistas:any[] = [];
    constructor( private userServ:Auth, private logService: LogService, private _lugaresService: LugaresService,private _artistasService: ArtistasService) {

      this.userServ.currentUser.subscribe((user: User) => this.Usuario = user);
      //this.log = logService.getTotalLog(this.Usuario.GlobalClientID);
      logService.getLogInit(this.Usuario.GlobalClientID);
      this.lugares = _lugaresService.getLugaresFav(this.Usuario.GlobalClientID);
      this.artistas = _artistasService.getArtistasFav(this.Usuario.GlobalClientID);
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
    //console.log(this.mostrarboton);
  }

  verAmigos(){
    this.visAmigos = true;
    this.visInformacionPersonal = false;
    this.visArtistasFavoritos = false;
    this.visLugaresFavoritos = false;
    this.visHistorialAcciones = false;
  }

  verInformacionPersonal(){
    this.visAmigos = false;
    this.visInformacionPersonal = true;
    this.visArtistasFavoritos = false;
    this.visLugaresFavoritos = false;
    this.visHistorialAcciones = false;
  }

  verArtistasFavoritos(){
    this.visAmigos = false;
    this.visInformacionPersonal = false;
    this.visArtistasFavoritos = true;
    this.visLugaresFavoritos = false;
    this.visHistorialAcciones = false;
  }

  verLugaresFavoritos(){
    this.visAmigos = false;
    this.visInformacionPersonal = false;
    this.visArtistasFavoritos = false;
    this.visLugaresFavoritos = true;
    this.visHistorialAcciones = false;
  }

  verHistorialAcciones(){
    this.visAmigos = false;
    this.visInformacionPersonal = false;
    this.visArtistasFavoritos = false;
    this.visLugaresFavoritos = false;
    this.visHistorialAcciones = true;
  }
}
