import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string,arrayPos?:number) : any {
    let keys = [];

    for (let key in value) {

      if(args.toLowerCase() == key.toLowerCase()){
      keys.push(value[key]);
      }
    }
    if(!arrayPos){
    return keys;
  }else{
    return keys[arrayPos];
  }
  }
}
