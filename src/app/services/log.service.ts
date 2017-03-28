import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  Log:any[] = [{
    id:"XXlEf03iy4rwFqqOTIQJ1JEskirj54ZR",
    tipoMensaje: "CancionEnviada",
    objetoMensaje:"Lloraré las penas",
    verboMensaje:"Canción enviada",
    mensaje: "Prueba de cancion enviada",
    FechaLog: new Date(2017, 2, 28, 19, 20, 12)
  },
  {
    id:"XXlEf03iy4rwFqqOTIQJ1JEskirj54ZR",
    tipoMensaje: "SolicitudAmistadAceptada",
    objetoMensaje:"Alejandro Utrera",
    verboMensaje:"Solicitud aceptada",
    mensaje: "Prueba de solicitud amistad aceptada",
    FechaLog: new Date(2017, 2, 27, 19, 22, 12)
  },
  {
    id:"XXlEf03iy4rwFqqOTIQJ1JEskirj54ZR",
    tipoMensaje: "LugarFavoritoAñadido",
    objetoMensaje:"El niño perdio",
    verboMensaje:"Lugar añadido a favoritos",
    mensaje: "Prueba Lugar Favorito Añadido",
    FechaLog: new Date(2017,2, 27, 19, 24, 18)
  },
  {
    id:"OtroUsuario",
    tipoMensaje: "LugarFavoritoAñadido",
    objetoMensaje:"El niño perdio",
    verboMensaje:"Lugar añadido a favoritos",
    mensaje: "Prueba Lugar Favorito Añadido",
    FechaLog: new Date(2017, 2, 28, 19, 24, 18)
  }];

  private paginaActual:number = 1;
  private limitePaginas:number = 1;
  //Fechas:any[]=[];
  constructor() {

  //  this.Fechas = this.getLogDates();
   }

  addLog(GlobalClientID:string, tipoMensaje:string, mensaje:string,objetoMensaje:string,verboMensaje:string){
    this.Log.push({id:GlobalClientID,
                   tipoMensaje: tipoMensaje,
                   objetoMensaje: objetoMensaje,
                   verboMensaje:verboMensaje,
                   mensaje: mensaje,
                   FechaLog: Date.now()
  });
  }

  getLog(GlobalClientID:string,Fecha:Date){
    let objetoFinal:any[]=[];
    let objeto =  this.Log.filter(
      function(data){

        let d:any = new Date(data.FechaLog);
        d.setHours(0,0,0,0);

        let fech:any = new Date(Fecha);

        return data.id == GlobalClientID && d - fech == 0
      }
    );

    for(let i = 0;i<objeto.length;i++){
      objetoFinal.push(objeto[i+((this.paginaActual-1)*this.limitePaginas)]);
    }
    return objetoFinal;
  }

  getLogCount(GlobalClientID:string){
    let paginado:any[] = [];
    let total:number = this.Log.filter(
      function(data){
        return data.id == GlobalClientID
      }
    ).length/this.limitePaginas;
    for(let i=0;i<=Math.round(total);i++){
      paginado.push(i+1);
    }
    return paginado;
  }

  getLogMax(GlobalClientID:string){
    let paginado:any[] = [];
    let total:number = this.Log.filter(
      function(data){
        return data.id == GlobalClientID
      }
    ).length/this.limitePaginas;
    return Math.round(total)+1

  }

  getLogDates(){
    var lookup = {};
    var items = this.Log;

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

    CambiaPagina(nuevaPagina:number){
          this.paginaActual = nuevaPagina;
        }

}
