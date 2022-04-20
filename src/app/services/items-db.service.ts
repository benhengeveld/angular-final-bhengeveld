import { Injectable } from '@angular/core';
import {DatabaseService} from "./database.service";
import {Item} from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class ItemsDBService {

  constructor(private database: DatabaseService) { }

  private static errorHandler(error): any {
    console.error("Error: " + error);
  }

  //crud operations
  public insert(item: Item, callback) {
    function txFunction(tx: any) {
      let sql: string = 'INSERT INTO items(name, price) VALUES(?,?);';
      let options = [item.name, item.price];

      tx.executeSql(sql, options, callback, ItemsDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, ItemsDBService.errorHandler, () => {
      console.log('Success: items insert transaction successful');
    });
  }

  public selectAll(): Promise<any> {
    let options = [];
    let items: Item[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM items;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let item = new Item(row['name'], row['price']);
              item.id = row['id'];
              items.push(item);
            }
            resolve(items);
          } else {
            reject("No items found");
          }
        }, ItemsDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, ItemsDBService.errorHandler, () => {
        console.log('Success: items selectAll transaction successful');
      });
    });
  }

  public select(id: number): Promise<any> {
    let options = [id];
    let item: Item = null;

    return new Promise((resolve, reject) => {

      function txFunction(tx) {
        let sql = "SELECT * FROM items WHERE id=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            item = new Item(row['name'], row['price']);
            item.id = row['id'];
            resolve(item);
          } else {
            reject("No item found");
          }
        }, ItemsDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, ItemsDBService.errorHandler, () => {
        console.log('Success: items select transaction successful');
      });
    });
  }

  public delete(item: Item, callback) {
    function txFunction(tx: any) {
      let sql: string = 'DELETE FROM items WHERE id=?;';
      let options = [item.id];

      tx.executeSql(sql, options, callback, ItemsDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, ItemsDBService.errorHandler, () => {
      console.log('Success: items delete transaction successful');
    });
  }

  public update(item: Item, callback) {
    function txFunction(tx: any) {
      let sql: string = 'UPDATE items SET name=?, price=? WHERE id=?;';
      let options = [item.name, item.price, item.id];

      tx.executeSql(sql, options, callback, ItemsDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, ItemsDBService.errorHandler, () => {
      console.log('Success: items update transaction successful');
    });
  }

}
