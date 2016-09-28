import { Injectable } from '@angular/core';
import { Order } from "./order";
import { OrderItem } from "./order-item";
import { Http } from "@angular/http"; // inject to constructor
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import {Operator, Observable} from "rxjs";

const ORDERS = [
      new Order([
      new OrderItem('Samsung Note7',1,2490),
      new OrderItem('MacBook',1,4900),
      new OrderItem('Ipad Mini',2,1450)
    ], new Date("2015-12-25")),
      new Order([
        new OrderItem('Samsung Note5',10,2190),
        new OrderItem('MacBook',2,6500),
        new OrderItem('Ipad',2,1850)
      ], new Date("2015-12-31"))
    ]

const LOCAL_KEY:string ="order_key";
const URL:string ="data/orders.json"; //path of files
@Injectable()
export class OrderService {

  private http:Http
  constructor(http:Http) {
    this.load();
    this.http = http;
   }
  private _orders:Array<Order>;

   save(){
      localStorage[LOCAL_KEY] = JSON.stringify(this._orders)
    }

    //load orderItem data from local storage
    //if there is not data give it initial data
    load():Array<Order>
    {
      let string_data = localStorage[LOCAL_KEY];
      let order_array;

      if(typeof string_data == "undefined")
      {
        order_array = ORDERS; //not found ,save in localStorage
        this._orders = this.loadData(order_array);
        this.save();
      }
      else
      {
        order_array = JSON.parse(string_data); //when we found data
        this._orders = this.loadData(order_array);
      }
      
      return this._orders;
    }

/*
    getOrderFromURL():Promise<Array<Order>> //(callback:Function) {    
      {
        /*
      this.http.get(URL).subscribe(data =>{
        console.log(data);
        console.log(data.json())
        
        callback(this.loadData(data.json()))
      })
      */
      /*
      return this.http.get(URL).toPromise().then( resp => 
        this.loadData(resp.json()))
        .catch(reason => []) 
        
    }
*/
/*
    getOrderFromURL():Observable<Array<Order>> {
      return this.http.get(URL).map(resp => {
        return this.loadData(resp.json());
      })
    }
*/

    loadDataFromURL():Promise<Array<Order>>{
      return this.http.get(URL).toPromise().then( resp => {
        this._orders = this.loadData(resp.json());
        this.save();
        return this._orders;
      })
        
    }

    getAllOrder():Array<Order>
    {
      return this._orders;
    }

    getOrder(id:number)
    {
      /*
      let all_order = this.getAllOrder();
      for(let x=0; x < all_order.length: x++)
        if(all_order[x].id == id)
          return all_order[x]
      return null;
      */
      console.log('find: ' + id)
      return this.getAllOrder().find( (item, index, obj) => {
        return item.id == id;
      })
    }
  
    loadData(orders_json_array:Array<any>){
      let orders:Array<Order> = [];
      orders_json_array.forEach(( orderItem, index, arr)=> {
        let items:Array<OrderItem> = [];
        orderItem.items.forEach((item, item_index, item_arr)=> {
            items.push(new OrderItem(item.item, item.quantity, item.unit_price))
        })
        let order = new Order(items, new Date(orderItem.create_time))
        order.id = orderItem.id;
        orders.push(order);
      })
      return orders;
    }

    updateOrder(order:Order){

      //find index of order in _orders
      //old typescript way
      /*
      let index = -1;
      for(let i=0; i < this._orders.length; i++)
        if(this._orders[i].id == order.id){
          index = i;
          break;
        }
        */
      let index = this._orders.findIndex((item) =>{
        return item.id == order.id
      })

      if(index == -1)
        this._orders.push(order); //add new
      else{
        //update _orders[index] with order
        this._orders[index] = order;
      }
      this.save();
    }

    deleteOrder(order:Order)
    {
      let index = this._orders.findIndex((item) =>{
        return item.id == order.id
      })

      this._orders.splice(index, 1);
      this.save();
    }
}
