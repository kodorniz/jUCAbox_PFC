import { Injectable } from '@angular/core';


@Injectable()
export class LugaresService {

  private lugaresFav:Lugar[]=[];
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

  getLugares(){
    return this.lugares;
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

  addFav(id:string){
    this.lugaresFav.push(this.getLugar(id));
  }

  getFav(id:string){
    return this.lugaresFav.filter(
      function(data){ return data.id == id }
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

export interface Lugar{
  id: string,
  nombre: string,
  descripcion: string,
  img: string[],
  provincia: string,
  ciudad: string,
  direccion: string
}
