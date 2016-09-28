import { Pipe, PipeTransform } from '@angular/core';
import { OrderItem } from './order-item'

@Pipe({
  name: 'totalPipe'
})
export class TotalPipePipe implements PipeTransform {

  transform(items: Array<OrderItem>, args?: any): any {
    let total = 0

    items.forEach((value:OrderItem, index:number, arr:OrderItem[]) => {
      total += value.unit_price * value.quantity;
    })

    if(typeof args == "number" && args > 0)
      total = total + args;

    return total;
  }

}
