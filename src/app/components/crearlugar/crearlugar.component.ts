import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {SelectModule, IOption} from 'ng-select';
import { LugaresService } from '../../services/lugares.service';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';
import {  Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { NotificationsService } from 'angular2-notifications';
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
  tipoMArray:any[] =[];
  token:string;
  public filesToUpload: Array<File>;
  public enviado=false;
  lugarID:string;
    menuState:string = 'out';

  tipoMusicaValores:Array<IOption> = [
       {value: '0', label: 'Pop'},
       {value: '1', label: 'Dance'},
       {value: '2', label: 'Reggaeton'},
       {value: '3', label: 'Rock'}
   ];
  constructor(private router: Router,private activatedRoute:ActivatedRoute,private _lugaresService: LugaresService,private _notificationService: NotificationsService) {


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

  this.activatedRoute.params.subscribe( params => {
      this.lugarID = params.id;
      if(this.lugarID){
        this._lugaresService.getLugar(params['id']).subscribe(data =>
        {

          this.id = data.lugar._id;
          this.nombre = data.lugar.nombre;
          this.descripcion = data.lugar.descripcion;
          this.email = data.lugar.email;
          this.provincia = data.lugar.provincia;
          this.ciudad = data.lugar.ciudad;
          this.direccion = data.lugar.direccion;
          this.token = data.lugar.token;
          if(data.lugar.tipoMusica)
            for(let i=0;i<data.lugar.tipoMusica.length;i++){
              //this.tipoMusica = data.lugar.tipoMusica[i];
                  this.tipoMArray.push(data.lugar.tipoMusica[i].value);
            }
          //this.tipoMusica = data.lugar.tipoMusica;

          this.tipoMusica = this.tipoMArray;

        });
      }
  });



  }

  public options = {
      position: ["bottom", "left"],
      timeOut: 5000,
      lastOnBottom: true
  }
    toggleMenu() {
      // 1-line if statement that toggles the value:
      this.menuState = this.menuState === 'out' ? 'in' : 'out';
    }

  ngOnInit() {
  }

generaEtiquetas()
{
  let etiquetas:any[]=[];
    if(this.forma.value.tipoMusica){
    for(let i=0; i<this.forma.value.tipoMusica.length;i++){
      for(let j=0;j<this.tipoMusicaValores.length;j++){
      if(this.tipoMusicaValores[j].value == this.forma.value.tipoMusica[i]){
        etiquetas.push(this.tipoMusicaValores[j]);
      }
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
      console.log('TM',this.tipoMusica);

      if(this.lugarID){

        this._lugaresService.updateLugar(this.forma.value,this.lugarID).subscribe(
          response => {
            if(!response){

            }else{


              this._notificationService.success( this.nombre,"Actualizado correctamente");
              this._lugaresService.updateLugarTM(this.generaEtiquetas(),this.lugarID).subscribe(
                data=>{
                  this._lugaresService.deleteAllimg(this.lugarID).subscribe(

                    data=>{
                      this._lugaresService.makeFileRequest('/api/upload-image-lugar/' + this.lugarID,[],this.filesToUpload,'image')
                          .then(
                              (result)=>{


                                //this.router.navigate(['/lugar',response.lugar._id]);
                              },
                              (error)=>{
                                  console.log(error);
                              }

                          );
                    }

                  );

                }

              );

            }

          }


        );

      }else{

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
      }
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
