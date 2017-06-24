import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {SelectModule, IOption} from 'ng-select';
import { LugaresService } from '../../services/lugares.service';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';
import {  Router } from '@angular/router';
declare var swal: any;

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
  token:string;
  public filesToUpload: Array<File>;
  public enviado=false;

  tipoMusicaValores:Array<IOption> = [
       {value: '0', label: 'Pop'},
       {value: '1', label: 'Dance'},
       {value: '2', label: 'Reggaeton'},
       {value: '3', label: 'Rock'}
   ];
  constructor(private router: Router,private _lugaresService: LugaresService) {


    this.forma = new FormGroup({
    'nombre': new FormControl(this.nombre,[Validators.required,Validators.minLength(3)]),
    'descripcion': new FormControl(this.descripcion,[Validators.required,Validators.minLength(3)]),
    'email': new FormControl(this.email,[Validators.required, Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$")]),
    'provincia': new FormControl(this.provincia,Validators.required),
    'ciudad': new FormControl(this.ciudad,Validators.required),
    'direccion': new FormControl(this.direccion,Validators.required),
    'tipoMusica': new FormControl(this.tipoMusica),
    'token': new FormControl(this.token)

  });
  }

  ngOnInit() {
  }

generaEtiquetas()
{
  let etiquetas:any[]=[];

    for(let i=0; i<this.forma.value.tipoMusica.length;i++){
      for(let j=0;j<this.tipoMusicaValores.length;j++){
      if(this.tipoMusicaValores[j].value == this.forma.value.tipoMusica[i]){
        etiquetas.push(this.tipoMusicaValores[j]);
      }
    }
    }

    return etiquetas;
}

nombreRelleno(){
  if (this.enviado)
      return this.forma.value.nombre;
  else
    return true
}
emailRelleno(){
    if (this.enviado)
  return this.forma.value.email;
  else
    return true
}

ProvinciaRelleno(){
    if (this.enviado)
  return this.forma.value.provincia;
  else
    return true
}

CiudadRelleno(){
    if (this.enviado)
  return this.forma.value.ciudad;
  else
    return true
}

tipoMusicaRelleno(){
    if (this.enviado)
  return this.forma.value.tipoMusica;
  else
    return true
}

descripcionRelleno(){
    if (this.enviado)
    return this.forma.value.descripcion;
    else
      return true
}
  guardarCambios(){
    this.enviado = true;
    if(this.forma.valid){
      console.log(this.forma.value)
        this._lugaresService.addLugar(this.forma.value).subscribe(
          response => {
            if(!response.lugar){

            }else{

              this._lugaresService.updateLugarTM(this.generaEtiquetas(),response.lugar._id).subscribe(
                data=>{
                  this._lugaresService.makeFileRequest('/api/upload-image-lugar/' + response.lugar._id,[],this.filesToUpload,'image')
                      .then(
                          (result)=>{
                            this.router.navigate(['/lugar',response.lugar._id]);
                          },
                          (error)=>{
                              console.log(error);
                          }

                      );
                }

              );

            }

          }


        );
    }else{
      swal(
        'Oops...',
        'Rellene todos los campos correctamente',
        'error'
      )
    }

  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
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
