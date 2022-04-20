import { Component, OnInit } from '@angular/core';
import {Item} from "../models/item.model";
import {ItemsDBService} from "../services/items-db.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-itemspage',
  templateUrl: './itemspage.component.html',
  styleUrls: ['./itemspage.conponent.css']
})
export class ItemspageComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemsDB: ItemsDBService, private router: Router) { }

  ngOnInit(): void {
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
    this.router.navigate(['addItem']);
  }

  btnModify_click(item: Item){
    this.router.navigate(['modifyItem/' + item.id]);
  }

  btnDelete_click(item: Item){
    this.itemsDB.delete(item, () => {
      alert("Record deleted successfully")
    });
    this.ngOnInit();
  }

  btnOrders_click(item: Item) {
    this.router.navigate(['orders'], {queryParams: { itemId: item.id }});
  }

  btnOrder_click(item: Item) {
    this.router.navigate(['addOrder'], {queryParams: { itemId: item.id }});
  }
}
