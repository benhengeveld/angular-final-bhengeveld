import { Injectable } from '@angular/core';
import {DatabaseService} from "./database.service";
import {Order} from "../models/order.model";
import {Store} from "../models/store.model";
import {Item} from "../models/item.model";
import {OrderStatus} from "../models/orderStatus.model";

@Injectable({
  providedIn: 'root'
})
export class OrderStatusDBService {

  constructor(private database: DatabaseService) { }

  private static errorHandler(error): any {
    console.error("Error: " + error);
  }

  public selectAll(): Promise<any> {
    let options = [];
    let orderStatuses: OrderStatus[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM order_status;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let orderStatus = new OrderStatus(row['status']);
              orderStatus.id = row['id'];
              orderStatuses.push(orderStatus);
            }
            resolve(orderStatuses);
          } else {
            reject("No order_statuses found");
          }
        }, OrderStatusDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, OrderStatusDBService.errorHandler, () => {
        console.log('Success: order_status selectAll transaction successful');
      });
    });
  }

  public select(id: number): Promise<any> {
    let options = [id];
    let orderStatus: OrderStatus = null;

    return new Promise((resolve, reject) => {

      function txFunction(tx) {
        let sql = "SELECT * FROM order_status WHERE id=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            orderStatus = new OrderStatus(row['status']);
            orderStatus.id = row['id'];
            resolve(orderStatus);
          } else {
            reject("No store found");
          }
        }, OrderStatusDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, OrderStatusDBService.errorHandler, () => {
        console.log('Success: stores select transaction successful');
      });
    });
  }

}
