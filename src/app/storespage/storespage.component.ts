import { Component, OnInit } from '@angular/core';
import {Store} from "../models/store.model";
import {Router} from "@angular/router";
import {StoresDBService} from "../services/stores-db.service";

@Component({
  selector: 'app-storespage',
  templateUrl: './storespage.component.html',
  styleUrls: ['./storespage.conponent.css']
})
export class StorespageComponent implements OnInit {
  stores: Store[] = [];

  constructor(private storesDB: StoresDBService, private router: Router) { }

  ngOnInit(): void {
    this.storesDB.selectAll()
      .then(data => {
        this.stores = data;
        console.info(data);
      })
      .catch(err => {
        this.stores = [];
        console.error(err);
      });
  }

  btnAdd_click() {
    this.router.navigate(['addStore']);
  }

  btnModify_click(store: Store) {
    this.router.navigate(['modifyStore/' + store.id]);
  }

  btnDelete_click(store: Store) {
    this.storesDB.delete(store, () => {
      alert("Record deleted successfully")
    });
    this.ngOnInit();
  }

  btnOrders_click(store: Store) {
    this.router.navigate(['orders'], {queryParams: { storeId: store.id }});
  }

  btnEmployees_click(store: Store) {
    this.router.navigate(['employees'], {queryParams: { storeId: store.id }});
  }

  btnOrder_click(store: Store) {
    this.router.navigate(['addOrder'], {queryParams: { storeId: store.id }});
  }

}
