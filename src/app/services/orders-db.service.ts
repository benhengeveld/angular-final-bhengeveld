import { Injectable } from '@angular/core';
import {DatabaseService} from "./database.service";
import {Store} from "../models/store.model";
import {Order} from "../models/order.model";
import {Item} from "../models/item.model";
import {OrderStatus} from "../models/orderStatus.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersDBService {

  constructor(private database: DatabaseService) { }

  private static errorHandler(error): any {
    console.error("Error: " + error);
  }

  //crud operations
  public insert(order: Order, callback) {
    function txFunction(tx: any) {
      let sql: string = 'INSERT INTO orders(storeId, itemId, quantity, orderStatusId) VALUES(?,?,?,?);';
      let options = [order.storeId, order.itemId, order.quantity, order.orderStatusId];

      tx.executeSql(sql, options, callback, OrdersDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, OrdersDBService.errorHandler, () => {
      console.log('Success: orders insert transaction successful');
    });
  }

  public selectAll(): Promise<any> {
    let options = [];
    let orders: Order[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT o.id, o.storeId, o.itemId, o.quantity, o.orderStatusId, s.id AS s_id, s.city, s.address, s.postalCode, i.id AS i_id, i.name, i.price, os.id AS os_id, os.status FROM orders AS o JOIN stores AS s ON o.storeId = s.id JOIN items AS i ON o.itemId = i.id JOIN order_status as os ON o.orderStatusId = os.id;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let order = new Order(row['storeId'], row['itemId'], row['quantity'], row['orderStatusId']);
              order.id = row['id'];
              let store: Store = new Store(row['city'], row['address'], row['postalCode']);
              store.id = row['s_id'];
              order.store = store;
              let item: Item = new Item(row['name'], row['price']);
              item.id = row['i_id'];
              order.item = item;
              let orderStatus = new OrderStatus(row['status']);
              orderStatus.id = row['os_id'];
              order.orderStatus = orderStatus;
              orders.push(order);
            }
            resolve(orders);
          } else {
            reject("No orders found");
          }
        }, OrdersDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, OrdersDBService.errorHandler, () => {
        console.log('Success: orders selectAll transaction successful');
      });
    });
  }

  public selectAllWhereStatus(orderStatusId: number): Promise<any> {
    let options = [orderStatusId];
    let orders: Order[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT o.id, o.storeId, o.itemId, o.quantity, o.orderStatusId, s.id AS s_id, s.city, s.address, s.postalCode, i.id AS i_id, i.name, i.price, os.id AS os_id, os.status FROM orders AS o JOIN stores AS s ON o.storeId = s.id JOIN items AS i ON o.itemId = i.id JOIN order_status as os ON o.orderStatusId = os.id WHERE o.orderStatusId=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let order = new Order(row['storeId'], row['itemId'], row['quantity'], row['orderStatusId']);
              order.id = row['id'];
              let store: Store = new Store(row['city'], row['address'], row['postalCode']);
              store.id = row['s_id'];
              order.store = store;
              let item: Item = new Item(row['name'], row['price']);
              item.id = row['i_id'];
              order.item = item;
              let orderStatus = new OrderStatus(row['status']);
              orderStatus.id = row['os_id'];
              order.orderStatus = orderStatus;
              orders.push(order);
            }
            resolve(orders);
          } else {
            reject("No orders found");
          }
        }, OrdersDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, OrdersDBService.errorHandler, () => {
        console.log('Success: orders selectAll transaction successful');
      });
    });
  }

  public selectAllWhereStore(storeId: number): Promise<any> {
    let options = [storeId];
    let orders: Order[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT o.id, o.storeId, o.itemId, o.quantity, o.orderStatusId, s.id AS s_id, s.city, s.address, s.postalCode, i.id AS i_id, i.name, i.price, os.id AS os_id, os.status FROM orders AS o JOIN stores AS s ON o.storeId = s.id JOIN items AS i ON o.itemId = i.id JOIN order_status as os ON o.orderStatusId = os.id WHERE o.storeId=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let order = new Order(row['storeId'], row['itemId'], row['quantity'], row['orderStatusId']);
              order.id = row['id'];
              let store: Store = new Store(row['city'], row['address'], row['postalCode']);
              store.id = row['s_id'];
              order.store = store;
              let item: Item = new Item(row['name'], row['price']);
              item.id = row['i_id'];
              order.item = item;
              let orderStatus = new OrderStatus(row['status']);
              orderStatus.id = row['os_id'];
              order.orderStatus = orderStatus;
              orders.push(order);
            }
            resolve(orders);
          } else {
            reject("No orders found");
          }
        }, OrdersDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, OrdersDBService.errorHandler, () => {
        console.log('Success: orders selectAll transaction successful');
      });
    });
  }

  public selectAllWhereStoreAndStatus(storeId: number, orderStatusId: number): Promise<any> {
    let options = [storeId, orderStatusId];
    let orders: Order[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT o.id, o.storeId, o.itemId, o.quantity, o.orderStatusId, s.id AS s_id, s.city, s.address, s.postalCode, i.id AS i_id, i.name, i.price, os.id AS os_id, os.status FROM orders AS o JOIN stores AS s ON o.storeId = s.id JOIN items AS i ON o.itemId = i.id JOIN order_status as os ON o.orderStatusId = os.id WHERE o.storeId=? AND o.orderStatusId=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let order = new Order(row['storeId'], row['itemId'], row['quantity'], row['orderStatusId']);
              order.id = row['id'];
              let store: Store = new Store(row['city'], row['address'], row['postalCode']);
              store.id = row['s_id'];
              order.store = store;
              let item: Item = new Item(row['name'], row['price']);
              item.id = row['i_id'];
              order.item = item;
              let orderStatus = new OrderStatus(row['status']);
              orderStatus.id = row['os_id'];
              order.orderStatus = orderStatus;
              orders.push(order);
            }
            resolve(orders);
          } else {
            reject("No orders found");
          }
        }, OrdersDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, OrdersDBService.errorHandler, () => {
        console.log('Success: orders selectAll transaction successful');
      });
    });
  }

  public selectAllWhereItem(itemId: number): Promise<any> {
    let options = [itemId];
    let orders: Order[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT o.id, o.storeId, o.itemId, o.quantity, o.orderStatusId, s.id AS s_id, s.city, s.address, s.postalCode, i.id AS i_id, i.name, i.price, os.id AS os_id, os.status FROM orders AS o JOIN stores AS s ON o.storeId = s.id JOIN items AS i ON o.itemId = i.id JOIN order_status as os ON o.orderStatusId = os.id WHERE o.itemId=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let order = new Order(row['storeId'], row['itemId'], row['quantity'], row['orderStatusId']);
              order.id = row['id'];
              let store: Store = new Store(row['city'], row['address'], row['postalCode']);
              store.id = row['s_id'];
              order.store = store;
              let item: Item = new Item(row['name'], row['price']);
              item.id = row['i_id'];
              order.item = item;
              let orderStatus = new OrderStatus(row['status']);
              orderStatus.id = row['os_id'];
              order.orderStatus = orderStatus;
              orders.push(order);
            }
            resolve(orders);
          } else {
            reject("No orders found");
          }
        }, OrdersDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, OrdersDBService.errorHandler, () => {
        console.log('Success: orders selectAll transaction successful');
      });
    });
  }

  public selectAllWhereItemAndStatus(itemId: number, orderStatusId: number): Promise<any> {
    let options = [itemId, orderStatusId];
    let orders: Order[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT o.id, o.storeId, o.itemId, o.quantity, o.orderStatusId, s.id AS s_id, s.city, s.address, s.postalCode, i.id AS i_id, i.name, i.price, os.id AS os_id, os.status FROM orders AS o JOIN stores AS s ON o.storeId = s.id JOIN items AS i ON o.itemId = i.id JOIN order_status as os ON o.orderStatusId = os.id WHERE o.itemId=? AND o.orderStatusId=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let order = new Order(row['storeId'], row['itemId'], row['quantity'], row['orderStatusId']);
              order.id = row['id'];
              let store: Store = new Store(row['city'], row['address'], row['postalCode']);
              store.id = row['s_id'];
              order.store = store;
              let item: Item = new Item(row['name'], row['price']);
              item.id = row['i_id'];
              order.item = item;
              let orderStatus = new OrderStatus(row['status']);
              orderStatus.id = row['os_id'];
              order.orderStatus = orderStatus;
              orders.push(order);
            }
            resolve(orders);
          } else {
            reject("No orders found");
          }
        }, OrdersDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, OrdersDBService.errorHandler, () => {
        console.log('Success: orders selectAll transaction successful');
      });
    });
  }

  public select(id: number): Promise<any> {
    let options = [id];
    let order: Order = null;

    return new Promise((resolve, reject) => {

      function txFunction(tx) {
        let sql = "SELECT o.id, o.storeId, o.itemId, o.quantity, o.orderStatusId, s.id AS s_id, s.city, s.address, s.postalCode, i.id AS i_id, i.name, i.price, os.id AS os_id, os.status FROM orders AS o JOIN stores AS s ON o.storeId = s.id JOIN items AS i ON o.itemId = i.id JOIN order_status as os ON o.orderStatusId = os.id WHERE o.id=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            order = new Order(row['storeId'], row['itemId'], row['quantity'], row['orderStatusId']);
            order.id = row['id'];
            let store: Store = new Store(row['city'], row['address'], row['postalCode']);
            store.id = row['s_id'];
            order.store = store;
            let item: Item = new Item(row['name'], row['price']);
            item.id = row['i_id'];
            order.item = item;
            let orderStatus = new OrderStatus(row['status']);
            orderStatus.id = row['os_id'];
            order.orderStatus = orderStatus;
            resolve(order);
          } else {
            reject("No order found");
          }
        }, OrdersDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, OrdersDBService.errorHandler, () => {
        console.log('Success: orders select transaction successful');
      });
    });
  }

  public delete(order: Order, callback) {
    function txFunction(tx: any) {
      let sql: string = 'DELETE FROM orders WHERE id=?;';
      let options = [order.id];

      tx.executeSql(sql, options, callback, OrdersDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, OrdersDBService.errorHandler, () => {
      console.log('Success: orders delete transaction successful');
    });
  }

  public update(order: Order, callback) {
    function txFunction(tx: any) {
      let sql: string = 'UPDATE orders SET storeId=?, itemId=?, quantity=?, orderStatusId=? WHERE id=?;';
      let options = [order.storeId, order.itemId, order.quantity, order.orderStatusId, order.id];

      tx.executeSql(sql, options, callback, OrdersDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, OrdersDBService.errorHandler, () => {
      console.log('Success: orders update transaction successful');
    });
  }

}
