import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinfoto'
})
export class SinfotoPipe implements PipeTransform {

  transform(value: any[],arrayPos?:number): string {
    let noimage = "assets/img/noimage.png";

    if(!value){
      return noimage;
    }
    if(!arrayPos){
      return (value.length >0) ? value[1].url : noimage;
  }else{
      return (value.length >0) ? value[arrayPos].url : noimage;
  }

  }

}
