import { Component, OnInit,AfterViewChecked } from '@angular/core';
import { JucaboxService } from '../../services/jucabox.service';
import { LugaresService } from '../../services/lugares.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements AfterViewChecked {
  mensajes:any[]=[];
  ok:any = false;
  constructor( private _lugaresService: LugaresService,public _jucaboxService: JucaboxService,private router:Router) {


  //  _jucaboxService.getPublic().subscribe(data=>{console.log(data)});
   }

  ngAfterViewChecked() {
    let mensajesTemp:any[]=[];
    let usuario:string;

    usuario = localStorage.getItem('userJB');

    if(usuario && !this.ok){
      this.ok = true;
     this._lugaresService.getMensajesTodos().subscribe(data=>{
        mensajesTemp = data.lugares;
        this._lugaresService.getLugaresFavP(usuario).subscribe(data2=>{
          console.log(data2.lugares);
          for(let i=0;i<mensajesTemp.length;i++){
            for(let j=0;j<data2.lugares.length;j++){
              if(mensajesTemp[i].lugarID._id == data2.lugares[j].lugarID._id){
                  this.mensajes.push(mensajesTemp[i]);
              }
            }
          }
        });

     });
 }
  }

  getImage(url:string){
      return '/api/get-image-lugar/' + url;
  }

  navigateLugar(id:string){
    this.router.navigate(['/lugar',id]);
  }

  isLogin(){
    if(localStorage.getItem('userJB')){
      return true;
    }else{
      return false;
    }
  }

}
