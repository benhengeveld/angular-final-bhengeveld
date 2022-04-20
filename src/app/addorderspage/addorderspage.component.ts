import { Component, OnInit } from '@angular/core';
import {Order} from "../models/order.model";
import {Store} from "../models/store.model";
import {StoresDBService} from "../services/stores-db.service";
import {OrdersDBService} from "../services/orders-db.service";
import {ItemsDBService} from "../services/items-db.service";
import {Item} from "../models/item.model";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-addorderspage',
  templateUrl: './addorderspage.component.html',
  styleUrls: ['./addorderspage.component.css']
})
export class AddorderspageComponent implements OnInit {
  order: Order = new Order(0, 0, 0, 1);
  stores: Store[] = [];
  items: Item[] = [];
  errors: string = "";

  constructor(private ordersDB: OrdersDBService, private storesDB: StoresDBService, private itemsDB: ItemsDBService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let itemId = Number(this.route.snapshot.queryParamMap.get('itemId'));
    let storeId = Number(this.route.snapshot.queryParamMap.get('storeId'));
    this.order.itemId = itemId;
    this.order.storeId = storeId;

    this.storesDB.selectAll()
      .then(data => {
        this.stores = data;
        console.info(data);
      })
      .catch(err => {
        this.stores = [];
        console.error(err);
      });

    this.itemsDB.selectAll()
      .then(data => {
        this.items = data;
        console.info(data);
      })
      .catch(err => {
        this.items = [];
        console.error(err);
      });
  }

  btnAdd_click() {
    this.errors = "";
    let quantityControl = new FormControl(this.order.quantity, Validators.compose([Validators.min(1), Validators.max(10000), Validators.required]));

    Promise.allSettled([this.storesDB.select(this.order.storeId), this.itemsDB.select(this.order.itemId)]).then(data => {
      if(data[0].status == 'rejected' || data[1].status == 'rejected' || quantityControl.errors != null){
        if(data[0].status == 'rejected'){
          this.errors += ", Store is required";
        }
        if(data[1].status == 'rejected'){
          this.errors += ", Item is required";
        }
        if(quantityControl.errors != null){
          this.errors += ", Quantity must be above 0 and less then 10,000";
        }
        this.errors = this.errors.substring(2, this.errors.length)
      }else{
        this.ordersDB.insert(this.order, () => {
          console.log("Record added successfully");
          alert("Record added successfully");
        });
      }
    });
  }

}
