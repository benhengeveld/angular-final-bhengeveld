import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../models/order.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {OrdersDBService} from "../services/orders-db.service";
import {Employee} from "../models/employee.model";
import {Store} from "../models/store.model";
import {StoresDBService} from "../services/stores-db.service";
import {Item} from "../models/item.model";
import {ItemsDBService} from "../services/items-db.service";
import {OrderStatus} from "../models/orderStatus.model";
import {OrderStatusDBService} from "../services/order-status-db.service";

@Component({
  selector: 'app-orderspage',
  templateUrl: './orderspage.component.html',
  styleUrls: ['./orderspage.conponent.css']
})
export class OrderspageComponent implements OnInit, OnDestroy {
  navigationSubscription;
  orders: Order[] = [];
  store: Store = null;
  item: Item = null;
  orderStatus: OrderStatus = null;

  constructor(private activatedRoute: ActivatedRoute, private ordersDB: OrdersDBService, private storesDB: StoresDBService, private itemsDB: ItemsDBService, private orderStatusDB: OrderStatusDBService, private router: Router, private route: ActivatedRoute) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    this.store = null;
    this.item = null;
    this.orderStatus = null;
    this.orders = [];
    let storeId = Number(this.route.snapshot.queryParamMap.get('storeId'));
    let itemId = Number(this.route.snapshot.queryParamMap.get('itemId'));
    let orderStatusId = Number(this.route.snapshot.queryParamMap.get('orderStatusId'));

    if(this.route.snapshot.queryParamMap.get('orderStatusId') != null){
      if(isNaN(orderStatusId)){
        this.router.navigate(['orders']);
      }else{
        this.orderStatusDB.select(orderStatusId)
          .then(data => {
            this.orderStatus = data;
            console.info(data);
          }).catch(err => {
          this.router.navigate(['orders']);
        });

        if(this.route.snapshot.queryParamMap.get('storeId') == null && this.route.snapshot.queryParamMap.get('itemId') == null){
          this.ordersDB.selectAllWhereStatus(orderStatusId)
            .then(data => {
              this.orders = data;
              console.info(data);
            })
            .catch(err => {
              this.orders = [];
              console.error(err);
            });
        }else{
          if(storeId > 0 && itemId == 0){
            this.ordersDB.selectAllWhereStoreAndStatus(storeId, orderStatusId)
              .then(data => {
                this.orders = data;
                console.info(data);
              })
              .catch(err => {
                this.orders = [];
                console.error(err);
              });

            this.storesDB.select(storeId)
              .then(data => {
                this.store = data;
                console.info(data);
              })
              .catch(err => {
                this.store = null;
                console.error(err);
              });
          }else if(storeId == 0 && itemId > 0){
            this.ordersDB.selectAllWhereItemAndStatus(itemId, orderStatusId)
              .then(data => {
                this.orders = data;
                console.info(data);
              })
              .catch(err => {
                this.orders = [];
                console.error(err);
              });

            this.itemsDB.select(itemId)
              .then(data => {
                this.item = data;
                console.info(data);
              })
              .catch(err => {
                this.item = null;
                console.error(err);
              });
          }else{
            this.router.navigate(['orders']);
          }
        }
      }
    }else{
      if(this.route.snapshot.queryParamMap.get('storeId') == null && this.route.snapshot.queryParamMap.get('itemId') == null){
        this.ordersDB.selectAll()
          .then(data => {
            this.orders = data;
            console.info(data);
          })
          .catch(err => {
            this.orders = [];
            console.error(err);
          });
      }else{
        if(storeId > 0 && itemId == 0){
          this.ordersDB.selectAllWhereStore(storeId)
            .then(data => {
              this.orders = data;
              console.info(data);
            })
            .catch(err => {
              this.orders = [];
              console.error(err);
            });

          this.storesDB.select(storeId)
            .then(data => {
              this.store = data;
              console.info(data);
            })
            .catch(err => {
              this.store = null;
              console.error(err);
            });
        }else if(storeId == 0 && itemId > 0){
          this.ordersDB.selectAllWhereItem(itemId)
            .then(data => {
              this.orders = data;
              console.info(data);
            })
            .catch(err => {
              this.orders = [];
              console.error(err);
            });

          this.itemsDB.select(itemId)
            .then(data => {
              this.item = data;
              console.info(data);
            })
            .catch(err => {
              this.item = null;
              console.error(err);
            });
        }else{
          this.router.navigate(['orders']);
        }
      }
    }

  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  btnAdd_click() {
    this.router.navigate(['addOrder']);
  }

  btnModify_click(order: Order) {
    this.router.navigate(['modifyOrder/' + order.id]);
  }

  btnDelete_click(order: Order) {
    this.ordersDB.delete(order, () => {
      alert("Record deleted successfully")
    });
    this.initialiseInvites();
  }

  btnBack_click(){
    this.router.navigate(['orders']);
  }

  btnSetPending_click(order: Order) {
    order.orderStatusId = 1;
    this.ordersDB.update(order, () => {
      alert("Order set to Pending")
    });
    this.initialiseInvites();
  }

  btnOutbound_click(order: Order) {
    order.orderStatusId = 2;
    this.ordersDB.update(order, () => {
      alert("Order set to Outbound")
    });
    this.initialiseInvites();
  }

  btnSetDelivered_click(order: Order) {
    order.orderStatusId = 3;
    this.ordersDB.update(order, () => {
      alert("Order set to Delivered")
    });
    this.initialiseInvites();
  }

  btnShowOrderStatus_click(orderStatusId: number) {
    if(this.store != null){
      this.router.navigate(['orders'], {queryParams: { orderStatusId: orderStatusId, storeId: this.store.id }});
    }else if(this.item != null){
      this.router.navigate(['orders'], {queryParams: { orderStatusId: orderStatusId, itemId: this.item.id }});
    }else{
      this.router.navigate(['orders'], {queryParams: { orderStatusId: orderStatusId }});
    }
  }

}
