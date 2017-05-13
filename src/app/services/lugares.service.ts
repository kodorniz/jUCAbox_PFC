import { Injectable } from '@angular/core';
//import { Select2OptionData } from 'ng2-select2';

@Injectable()
export class LugaresService {
  private tokenLugares:any[]=[
    {
      id:"1",
      token:"Token1"
    },
    {
      id:"2",
      token:"Token2"
    }
  ];

  private lugaresAdmin:any[]=[{
    lugarID: "1",
    userID: "google-oauth2|113690553810319532231"
  }];

  private lugaresFav:any[]=[{
    lugarID: "1",
    userID: "google-oauth2|113690553810319532231"
  },
  {
    lugarID: "2",
    userID: "google-oauth2|113690553810319532231"
  }];
  private lugares:Lugar[] = [
      {
        id: "1",
        nombre: "Niño Perdio",
        descripcion: "Discoteca 1: El poder más reconocido de Aquaman es la capacidad telepática para comunicarse con la vida marina, la cual puede convocar a grandes distancias.",
        img: ["assets/img/disco1.jpg",
         "assets/img/disco1.jpg",
        "assets/img/disco1.jpg"],
        provincia: "Madrid",
        ciudad:"Boadilla del Monte",
        direccion:"Calle Severo Ochoa"
      },
      {
        id: "2",
        nombre: "Malecon",
        descripcion: "Discoteca 2: El poder más reconocido de Aquaman es la capacidad telepática para comunicarse con la vida marina, la cual puede convocar a grandes distancias.",
        img: ["assets/img/disco2.jpg",
         "assets/img/disco2.jpg",
        "assets/img/disco2.jpg"],
        provincia: "Cádiz",
        ciudad:"Puerto de Santa Maria",
        direccion:" Plaza Juan de la Cosa"
      }
    ];

  constructor( ) {


   }

  isAdmin(lugarID:string,userID:string){

    let objeto =  this.lugaresAdmin.filter(
      function(data){
        return data.userID == userID && data.lugarID == lugarID
      }
    );

    if(objeto.length!=0)
      return true;
    else
      return false;
  }

  public countLugaresFav(userID:string){
    let count:any[] =  this.lugaresFav.filter(
      function(data){
        return data.userID == userID;
      }
    );

    return count.length;
  }

  getLugares(){

    return this.lugares;

  }
  getToken(id:string){
    if(id){

    return this.tokenLugares.filter(
      function(data){ return data.id == id }
    )[0]['token'];
  }
  }

  getLugaresFav(userID:string){
    let objeto:LugarFav[] =  this.lugaresFav.filter(
      function(data){
        return data.userID == userID;
      }
    );
    let objetoFinal:any[]=[];
    for(let i=0;i<objeto.length;i++ ){
      for(let j=0;j<this.lugares.length;j++ ){
        if(objeto[i].lugarID == this.lugares[j].id){
          objetoFinal.push(this.lugares[j]);
        }
      }

    }

    return objetoFinal;
  }
  getLugaresNombreT(termino:string){

    let lugaresArr:Lugar[] =[];
    if(termino){
              termino = termino.toLowerCase();

            for( let lugar of this.lugares){

              let nombre = lugar.nombre.toLowerCase();



              if( nombre.indexOf(termino)>=0){
                 lugaresArr.push(lugar);
              }

            }

  return lugaresArr;
  }else{
    return this.lugares;
  }
  }

  getLugaresNombre(termino:string,provincia:string,ciudad:string){

    let lugaresArr:Lugar[] =[];

    termino = termino.toLowerCase();

  for( let lugar of this.lugares){

    let nombre = lugar.nombre.toLowerCase();
    let _provincia = lugar.provincia.toLowerCase();
    let _ciudad = lugar.ciudad.toLowerCase();

    if( nombre.indexOf(termino)>=0 && _provincia.indexOf(provincia)>=0 && _ciudad.indexOf(ciudad)>=0){
       lugaresArr.push(lugar);
    }

  }

  return lugaresArr;
  }

  addFav(id:string,userID:string){
    //ADD MONGODB
    this.lugaresFav.push(
      {lugarID: id,
        userID: userID
      });
  }

  removeFav(lugarID:string,userID:string){

    console.log("ELIMINAR CON MONGO")

    //this.lugaresFav.pop(this.getLugar(lugarID));
  }

  getFav(id:string,userID:string){
    //return this.lugaresFav.filter(
    //  function(data){ return data.id === id && data.globalClientID === GlobalClientID }
    //)[0];
    return this.lugaresFav.filter(
      function(data){ return data.lugarID === id && data.userID === userID }
    )[0];

    // for(let lugar of this.lugares){
    //   if(lugar.id == id){
    //     return lugar;
    //   }
    // }
  }

  getLugar(id:string){
    return this.lugares.filter(
      function(data){ return data.id == id }
    )[0];
    // for(let lugar of this.lugares){
    //   if(lugar.id == id){
    //     return lugar;
    //   }
    // }
  }






}
export interface LugarFav{
  lugarID: string,
  userID:string
}

export interface Lugar{
  id: string,
  nombre: string,
  descripcion: string,
  img: string[],
  provincia: string,
  ciudad: string,
  direccion: string
}
