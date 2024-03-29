import { Component, OnInit , Input} from '@angular/core';
import { OrderService } from "../order.service";

//get data from Router
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  order
  constructor(private od:OrderService, private currentRoute:ActivatedRoute) { 
    //this.order = od.getAllOrders()[0];
  }

  ngOnInit() {

    //get ID from router
    this.currentRoute.params.forEach( (params:Params) => {
      //now we get an id of the order
      console.log(params['id']);
      this.order = this.od.getOrder(params['id']);
    })
  }

}
