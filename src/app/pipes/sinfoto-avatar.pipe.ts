import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinfotoAvatar'
})
export class SinfotoAvatarPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let noimage = "assets/img/noimage.png";

    if(!value){
      return noimage;
    }else{
      return value;
    }
  }

}
