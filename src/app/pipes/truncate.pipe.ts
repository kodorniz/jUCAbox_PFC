import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length?: number): any {
    if(length){
      if(length > value.length){
        return value.substring(0,length);
      }else{
        return value.substring(0,length) + '...';
      }

    }else{
      return value.substring(0,50);
    }

  }

}
