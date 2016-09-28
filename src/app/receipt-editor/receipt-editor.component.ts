import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from "../order.service";
import { Order } from "../order";
import { OrderItem } from "../order-item";

@Component({
  selector: 'app-receipt-editor',
  templateUrl: './receipt-editor.component.html',
  styleUrls: ['./receipt-editor.component.css']
})
export class ReceiptEditorComponent implements OnInit {

  private formDate:string;
  private order:Order;
//will run when create instance of class -- run first
  constructor(private route:ActivatedRoute, private os:OrderService) { }

  // will run when create component -- run second
  ngOnInit() {
    //get ID from router
    this.route.params.forEach( (params:Params) => {
      this.order = this.os.getOrder(params['id']);
      this.formDate = this.order.create_time.toISOString().substring(0,10);

      console.log(params['id']);
      console.log(this.order);
    })
  }

  //add item in order.items
  addItem(){
    this.order.items.push(new OrderItem("", 1, 0));
  }

  //delete item in order.items
  deleteItem(index:number){
    this.order.items.splice(index, 1);
  }

  validate():boolean{
    let result = true;
    if(this.formDate == "")
      return false;
    if(this.order.items.length <= 0)
      return false;
    
    this.order.items.forEach((item) => {
      if(item.item.length == 0)
        return false;
      if(item.unit_price <= 0)
        return false;
    })
    return result;
  }

  //save data to db
  save():boolean{
    if(!this.validate()) return false;

    this.order.create_time = new Date(this.formDate);
    this.os.updateOrder(this.order)
    return true;
  } 

  onSave(){
    if(!this.save())
      alert("invalid data entries");
    else
      alert("SAVED."); 
  }

  deleteOrder(){
    this.os.deleteOrder(this.order)
  }
  
  createOrder(){
    let newList = new Array<OrderItem>();
    newList.push(new OrderItem("", 1, 0));
    this.order = new Order(newList);
    this.formDate = new Date().toISOString().substring(0, 10);


  }
}
