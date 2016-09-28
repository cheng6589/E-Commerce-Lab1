import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taxPipe'
})
export class TaxPipePipe implements PipeTransform {

  transform(num:number, tax?: number): any {
    
    let dTax:number = 7;
    if(typeof tax == "number" && tax > 0 )
      dTax = tax;

    return num * dTax / 100;
  }

}
