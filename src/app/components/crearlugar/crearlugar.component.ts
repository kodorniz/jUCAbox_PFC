import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {SelectModule, IOption} from 'ng-select';
import { LugaresService } from '../../services/lugares.service';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';

@Component({
  selector: 'app-crearlugar',
  templateUrl: './crearlugar.component.html'
})
export class CrearlugarComponent implements OnInit {

  forma: FormGroup;
  id: string;
  nombre: string;
  descripcion: string;
  email:string;
  img: string[];
  provincia: string;
  ciudad: string;
  direccion: string;
  tipoMusica: Array<IOption>;
  
  tipoMusicaValores:Array<IOption> = [
       {value: '0', label: 'Pop'},
       {value: '1', label: 'Dance'},
       {value: '2', label: 'Reggaeton'},
       {value: '3', label: 'Rock'}
   ];
  constructor(private _lugaresService: LugaresService) {


    this.forma = new FormGroup({
    'nombre': new FormControl(this.nombre,[Validators.required,Validators.minLength(3)]),
    'descripcion': new FormControl(this.descripcion,[Validators.required,Validators.minLength(3)]),
    'email': new FormControl(this.email,[Validators.required, Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$")]),
    'provincia': new FormControl(this.provincia,Validators.required),
    'ciudad': new FormControl(this.ciudad),
    'direccion': new FormControl(this.direccion),
    'tipoMusica': new FormControl(this.tipoMusica)

  });
  }

  ngOnInit() {
  }

  guardarCambios(){
    if(this.forma.valid){
      this._lugaresService.addLugar(this.forma.value);
    }else{
      console.log(this.forma.valid);
      console.log(this.forma.value);
    }

  }


      Cdireccion(){
        let direccion_="";
        let ciudad_="";
        let provincia_="";
        if( this.forma.value.direccion==null || this.forma.value.ciudad==null || this.forma.value.provincia==null  ){
            direccion_= '+';
        }else{
            direccion_= this.forma.value.direccion + '+' + this.forma.value.ciudad + '+' + this.forma.value.provincia;

        }
        direccion_.replace(' ','+');
        return direccion_;

      }

}
