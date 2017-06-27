import { Injectable } from '@angular/core';
import { HttpModule, Http,RequestOptions,Headers,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LogService {

  Log:any[] = [];
  private initLog:any[]=[];
  private paginaActual:number = 1;
  private limitePaginas:number = 10;
  //Fechas:any[]=[];
  constructor(private http:Http) {

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

   public getLogN(userID:string){
     let authToken = localStorage.getItem('tokenJB');


     let headers = new Headers();
     headers.append('Authorization', authToken);

     let query =  userID;
     let url = '/api/getLog/' + userID;

     return this.http.get(url,{headers})
             .map( res =>{
               //  console.log(res.json());
               //  this.artistas =  res.json().artists.items;
                this.Log = res.json().log;

                 return res.json();

             }).catch(this.handleError);
   }

  addLog(userID:string, tipoMensaje:string, mensaje:string,objetoMensaje:string,verboMensaje:string,url_:string,previewUrl?:string){


    /*let today = new Date();
    console.log('LOG COMPLETO ANTES',this.Log);
    if(previewUrl){
      this.Log.unshift({userID:userID,
                     tipoMensaje: tipoMensaje,
                     objetoMensaje: objetoMensaje,
                     verboMensaje:verboMensaje,
                     mensaje: mensaje,
                     FechaLog: new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes(),today.getSeconds()),
                     url:url_,
                     cancion: previewUrl
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
    console.log('LOG COMPLETO DESPUES',this.Log);*/

    let authToken = localStorage.getItem('tokenJB');

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers });
    let objeto;

    if(previewUrl){
      objeto = {userID:userID,
                     tipoMensaje: tipoMensaje,
                     objetoMensaje: objetoMensaje,
                     verboMensaje:verboMensaje,
                     mensaje: mensaje,

                     url:url_,
                     cancion: previewUrl}
    }else{

    objeto = {userID:userID,
                   tipoMensaje: tipoMensaje,
                   objetoMensaje: objetoMensaje,
                   verboMensaje:verboMensaje,
                   mensaje: mensaje,

                   url:url_}
}




    return this.http
      .post('/api/addLog',objeto,options)
      .map(res => {

        return res.json();
      }
    ).catch(this.handleError);





  }

  getLogInit(userID:any){

    let objetoFinal:any[]=[];
    let numeroVueltas:number = 0;


    this.getLogN(userID).subscribe(
        data=>{

         let objeto = data.log;

         numeroVueltas=this.getVueltas(objeto.length,this.paginaActual,this.limitePaginas);

         for(let i = 0;i<numeroVueltas;i++){
           //console.log(i+((this.paginaActual-1)*this.limitePaginas));
           if(objeto[i+((this.paginaActual-1)*this.limitePaginas)]!=undefined)
           objetoFinal.push(objeto[i+((this.paginaActual-1)*this.limitePaginas)]);
         }

         this.initLog = objetoFinal;
       }
    )





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


  if(limitePaginas*paginaActual < total)
    return total;
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

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure

        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body['error'] || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
      }

}
