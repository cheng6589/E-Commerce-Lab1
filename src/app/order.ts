import { OrderItem } from "./order-item"

export class Order {
    id:number
    create_time:Date;
    items:Array<OrderItem>

    constructor(items:Array<OrderItem>, date?:Date){
        let now = new Date()
        if(!date)
            this.create_time = now
        else
            this.create_time = date;
        this.id = this.create_time.getTime()
        this.items = items
    }

    getTotal():number{
       
        let sum = 0;

        this.items.forEach((value:OrderItem, index:number, arr:OrderItem[]) => {
            sum += value.unit_price * value.quantity
        })
        return sum;
      
    }   

}

