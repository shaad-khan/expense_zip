import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipef'
})
export class PipefPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args==undefined) return value;
    console.log(JSON.stringify(args));
    return value.filter(function(d){
      console.log(d.SheetStatus);
     return d.SheetStatus==args;
    })
  }

}
