import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  Log:any[] = [{
    GlobalClientID:"XXlEf03iy4rwFqqOTIQJ1JEskirj54ZR",
    tipoMensaje: "Cancion",
    objetoMensaje:"Lloraré las penas",
    verboMensaje:"Canción enviada",
    mensaje: "Prueba de cancion enviada",
    FechaLog: new Date(2017, 2, 28, 19, 20, 12)
  },
  {
    GlobalClientID:"XXlEf03iy4rwFqqOTIQJ1JEskirj54ZR",
    tipoMensaje: "Amistad",
    objetoMensaje:"Alejandro Utrera",
    verboMensaje:"Solicitud aceptada",
    mensaje: "Prueba de solicitud amistad aceptada",
    FechaLog: new Date(2017, 2, 27, 19, 22, 12)
  },
  {
    GlobalClientID:"XXlEf03iy4rwFqqOTIQJ1JEskirj54ZR",
    tipoMensaje: "Lugar",
    objetoMensaje:"El niño perdio",
    verboMensaje:"Lugar añadido a favoritos",
    mensaje: "Prueba Lugar Favorito Añadido",
    FechaLog: new Date(2017,2, 27, 19, 24, 18)
  },
  {
    GlobalClientID:"OtroUsuario",
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
      default:
          return 'fa  bg-blue fa-question';

     }
   }

  addLog(GlobalClientID:string, tipoMensaje:string, mensaje:string,objetoMensaje:string,verboMensaje:string){
    this.Log.push({GlobalClientID:GlobalClientID,
                   tipoMensaje: tipoMensaje,
                   objetoMensaje: objetoMensaje,
                   verboMensaje:verboMensaje,
                   mensaje: mensaje,
                   FechaLog: Date.now()
  });
  }

  getLogInit(GlobalClientID:string){
    let objetoFinal:any[]=[];
    let numeroVueltas:number = 0;
    let objeto =  this.Log.filter(
      function(data){
        return data.GlobalClientID == GlobalClientID
      }
    );
    numeroVueltas=this.getVueltas(objeto.length,this.paginaActual,this.limitePaginas);
    for(let i = 0;i<numeroVueltas;i++){
      objetoFinal.push(objeto[i+((this.paginaActual-1)*this.limitePaginas)]);
    }
    this.initLog = objetoFinal;
  }

  getLog(GlobalClientID:string,Fecha:Date){
    let objetoFinal:any[]=[];
    let numeroVueltas:number = 0;
    let objeto =  this.initLog.filter(
      function(data){

        let d:any = new Date(data.FechaLog);
        d.setHours(0,0,0,0);

        let fech:any = new Date(Fecha);

        return data.GlobalClientID == GlobalClientID && d - fech == 0
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

  getLogCount(GlobalClientID:string){
    let paginado:any[] = [];
    let total:number = this.Log.filter(
      function(data){
        return data.GlobalClientID == GlobalClientID
      }
    ).length/this.limitePaginas;
    for(let i=0;i<Math.ceil(total);i++){
      paginado.push(i+1);
    }
    return paginado;
  }

  getLogMax(GlobalClientID:string){
    let paginado:any[] = [];
    let total:number = this.Log.filter(
      function(data){
        return data.GlobalClientID == GlobalClientID
      }
    ).length/this.limitePaginas;
    return Math.ceil(total);

  }

  getLogDates(GlobalClientID:string){
    var lookup = {};

    var items =  this.initLog.filter(
      function(data){
        return data.GlobalClientID == GlobalClientID;
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

    CambiaPagina(nuevaPagina:number,GlobalClientID:string){
          this.paginaActual = nuevaPagina;
          this.getLogInit(GlobalClientID);
          console.log(this.initLog);
        }

    nextPage(GlobalClientID:string){

        this.CambiaPagina(this.paginaActual+1,GlobalClientID);

    }

    previousPage(GlobalClientID:string){

        this.CambiaPagina(this.paginaActual-1,GlobalClientID);

    }

    firstPage(GlobalClientID:string){

        this.CambiaPagina(1,GlobalClientID);

    }

    lastPage(GlobalClientID:string){

        this.CambiaPagina(this.getLogMax(GlobalClientID),GlobalClientID);

    }

}
