import { Injectable } from '@angular/core';



@Injectable()
export class GlobalService {
  //callback:string = '';

  constructor() { }

  getCallbackurl(){
    return localStorage.getItem('callbackurl');
  }

  setCallbackurl(url:string){
    localStorage.setItem('callbackurl',url);
  }



}
