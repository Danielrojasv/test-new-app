import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customdate'
})
export class CustomdatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let todaysDate = new Date();
    let inputDate = new Date(value);
    if(inputDate.getDate() == todaysDate.getDate() && 
        inputDate.getMonth() == todaysDate.getMonth() && 
        inputDate.getFullYear() == todaysDate.getFullYear()) {
        return `${inputDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    }
    todaysDate.setDate( todaysDate.getDate() - 1 );
    if(inputDate.getDate() == todaysDate.getDate() && 
        inputDate.getMonth() == todaysDate.getMonth() && 
        inputDate.getFullYear() == todaysDate.getFullYear()) {
        return `Yesterday`;
    }

    return `${inputDate.toLocaleString('en-US', { month: 'short', day: '2-digit' })}`;
  }

}
