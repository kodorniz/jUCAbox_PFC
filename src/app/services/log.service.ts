import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  Log:any[] = [{
    userID:"google-oauth2|113690553810319532231",
    tipoMensaje: "Cancion",
    objetoMensaje:"David Bisbal",
    verboMensaje:"Canción Lloraré las penas enviada",
    mensaje: "Prueba de cancion enviada",
    FechaLog: new Date(2017, 2, 28, 19, 20, 12),
    url: 'artista/5gOJTI4TusSENizxhcG7jB',
    previewUrl: 'https://p.scdn.co/mp3-preview/e5b76695ab2ab824b076c8d44be85b90f348fe17?cid=null'
  },
  {
    userID:"google-oauth2|113690553810319532231",
    tipoMensaje: "Amistad",
    objetoMensaje:"Alejandro Utrera",
    verboMensaje:"Solicitud aceptada",
    mensaje: "Prueba de solicitud amistad aceptada",
    FechaLog: new Date(2017, 2, 27, 19, 22, 12)
  },
  {
    userID:"google-oauth2|113690553810319532231",
    tipoMensaje: "Lugar",
    objetoMensaje:"El niño perdio",
    verboMensaje:"Lugar añadido a favoritos",
    mensaje: "Prueba Lugar Favorito Añadido",
    FechaLog: new Date(2017,2, 27, 19, 24, 18),
    url: "/lugar/1"
  },
  {
    userID:"OtroUsuario",
    tipoMensaje: "Lugar",
    objetoMensaje:"El niño perdio",
    verboMensaje:"Lugar añadido a favoritos",
    mensaje: "Prueba Lugar Favorito Añadido",
    FechaLog: new Date(2017, 2, 28, 19, 24, 18)
  }];
  private initLog:any[]=[];
  private paginaActual:number = 1;
  private limitePaginas:number = 2;
  //Fechas:any[]=[];
  constructor() {

  //  this.Fechas = this.getLogDates();
   }

   iconType(type:string){
     switch(type){
       case 'Cancion':
          return 'fa  bg-blue fa-music';
      case 'Amistad':
          return 'fa  bg-blue fa-users';
      case 'Lugar':
          return 'fa  bg-blue fa-home';
      case 'Artista':
              return 'fa  bg-blue fa-microphone';
      default:
          return 'fa  bg-blue fa-question';

     }
   }

  addLog(userID:string, tipoMensaje:string, mensaje:string,objetoMensaje:string,verboMensaje:string,url_:string,previewUrl?:string){
    let today = new Date();
    if(previewUrl){
      this.Log.unshift({userID:userID,
                     tipoMensaje: tipoMensaje,
                     objetoMensaje: objetoMensaje,
                     verboMensaje:verboMensaje,
                     mensaje: mensaje,
                     FechaLog: new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()),
                     url:url_,
                     previewUrl: previewUrl
    });
    }else{

    this.Log.unshift({userID:userID,
                   tipoMensaje: tipoMensaje,
                   objetoMensaje: objetoMensaje,
                   verboMensaje:verboMensaje,
                   mensaje: mensaje,
                   FechaLog: new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()),
                   url:url_
  });
  }

  }

  getLogInit(userID:string){
    let objetoFinal:any[]=[];
    let numeroVueltas:number = 0;
    console.log("getLogInit");
    let objeto =  this.Log.filter(
      function(data){
        return data.userID == userID
      }
    );

    numeroVueltas=this.getVueltas(objeto.length,this.paginaActual,this.limitePaginas);

    for(let i = 0;i<numeroVueltas;i++){
      objetoFinal.push(objeto[i+((this.paginaActual-1)*this.limitePaginas)]);
    }

    this.initLog = objetoFinal;

  }

  emptyLog(userID:string){

  }
  getLog(userID:string,Fecha:Date){
    let objetoFinal:any[]=[];
    let numeroVueltas:number = 0;

    let objeto =  this.initLog.filter(
      function(data){

        let d:any = new Date(data.FechaLog);
        d.setHours(0,0,0,0);

        let fech:any = new Date(Fecha);

        return data.userID == userID && d - fech == 0
      }
    );
    // numeroVueltas=this.getVueltas(objeto.length,this.paginaActual,this.limitePaginas);
    // for(let i = 0;i<numeroVueltas;i++){
    //   objetoFinal.push(objeto[i+((this.paginaActual-1)*this.limitePaginas)]);
    // }
    return objeto;
  }

getVueltas(total:number,paginaActual:number,limitePaginas:number):any{
  if(limitePaginas*paginaActual > total)
    return limitePaginas*paginaActual - total;
  else
    return limitePaginas;
}

  getLogCount(userID:string){
    let paginado:any[] = [];
    let total:number = this.Log.filter(
      function(data){
        return data.userID == userID
      }
    ).length/this.limitePaginas;
    for(let i=0;i<Math.ceil(total);i++){
      paginado.push(i+1);
    }
    return paginado;
  }

  getLogMax(userID:string){
    let paginado:any[] = [];
    let total:number = this.Log.filter(
      function(data){
        return data.userID == userID
      }
    ).length/this.limitePaginas;
    return Math.ceil(total);

  }

  getLogDates(userID:string){
    var lookup = {};

    var items =  this.initLog.filter(
      function(data){
        return data.userID == userID;
      }
    );

    var result = [];

    for (let i=0;i<items.length;i++ ) {
     let d = new Date(items[i].FechaLog);

      var name = d.setHours(0,0,0,0);

      if (!(name in lookup)) {
        lookup[name] = 1;
        result.push(name);
      }
    }

    return result;

      }

    CambiaPagina(nuevaPagina:number,userID:string){
          this.paginaActual = nuevaPagina;
          this.getLogInit(userID);
          console.log(this.initLog);
        }

    nextPage(userID:string){

        this.CambiaPagina(this.paginaActual+1,userID);

    }

    previousPage(userID:string){

        this.CambiaPagina(this.paginaActual-1,userID);

    }

    firstPage(userID:string){

        this.CambiaPagina(1,userID);

    }

    lastPage(userID:string){

        this.CambiaPagina(this.getLogMax(userID),userID);

    }

}
