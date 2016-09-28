import { Component, OnInit } from '@angular/core';
import { OrderService } from "../order.service";
import { Order } from "../order"
import {Operator, Observable} from "rxjs";

@Component({
  selector: 'app-receipt-selector',
  templateUrl: './receipt-selector.component.html',
  styleUrls: ['./receipt-selector.component.css']
})
export class ReceiptSelectorComponent implements OnInit {

  orders:Array<Order>
  promise_orders:Promise<Array<Order>>

  //ob_orders:Observable<Array<Order>>

  //inject the service instance in constructor
  constructor(private os:OrderService) { 
    this.orders = os.load();
    //callback
    /*
    os.getOrderFromURL(orders => {
      this.orders = os.loadData(orders);
    });
    */
    
    //this.promise_orders = os.getOrderFromURL();
    //this.ob_orders = os.getOrderFromURL();
  }

  loadFromURL(){
    this.os.loadDataFromURL().then( orders =>{
      this.orders = orders;
    })
  }



  //init when done created a component
  ngOnInit() {
    /*
    this.ob_orders.subscribe(data => {
      this.orders = data;
    })
    */
    /*
    this.promise_orders.then( orders => {
      this.orders = orders
   })
   */
  }

}
