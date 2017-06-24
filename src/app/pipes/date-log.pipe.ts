import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateLog'
})
export class DateLogPipe implements PipeTransform {
  private     datePipe: DatePipe = new DatePipe('es-ES');
  transform(value: any, args?: any): any {

    value = new Date(value);
    var today:any = new Date();

    var diffMs = ( today - value);

    var diffSeconds = Math.round(Math.abs((today.getTime() - value.getTime())/1000));  //Math.round(((diffMs % 86400000) % 3600000) % 60000 / 60000);

    var diffMinutes = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    var diffHours = Math.floor((diffMs % 86400000) / 3600000);
    let nuevaFecha = new Date(value);

    if (nuevaFecha.setHours(0,0,0,0)== new Date().setHours(0,0,0,0)){


      if(diffHours < 1){
        if (diffMinutes > 1){
        return "Hace " + diffMinutes + " minutos."
        }
        if (diffMinutes == 1){
          return "Hace " + diffMinutes + " minuto."
        }
        if (diffMinutes < 1){
          return "Hace " + diffSeconds + " segundos."
        }
      }
      if(diffHours == 1){
        return "Hace " + diffHours + " hora."
      }
      if(diffHours >= 1){
        return "Hace " + diffHours + " horas."
      }


    }else{
      return this.datePipe.transform(value, 'dd/MM/yyyy hh:mm');
    }

  }

}
