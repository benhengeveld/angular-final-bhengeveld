import { Injectable } from '@angular/core';
import {Store} from "../models/store.model";
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class StoresDBService {

  constructor(private database: DatabaseService) { }

  private static errorHandler(error): any {
    console.error("Error: " + error);
  }

  //crud operations
  public insert(store: Store, callback) {
    function txFunction(tx: any) {
      let sql: string = 'INSERT INTO stores(city, address, postalCode) VALUES(?,?,?);';
      let options = [store.city, store.address, store.postalCode];

      tx.executeSql(sql, options, callback, StoresDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, StoresDBService.errorHandler, () => {
      console.log('Success: stores insert transaction successful');
    });
  }

  public selectAll(): Promise<any> {
    let options = [];
    let stores: Store[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM stores;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let s = new Store(row['city'], row['address'], row['postalCode']);
              s.id = row['id'];
              stores.push(s);
            }
            resolve(stores);
          } else {
            reject("No stores found");
          }
        }, StoresDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, StoresDBService.errorHandler, () => {
        console.log('Success: stores selectAll transaction successful');
      });
    });
  }

  public select(id: number): Promise<any> {
    let options = [id];
    let store: Store = null;

    return new Promise((resolve, reject) => {

      function txFunction(tx) {
        let sql = "SELECT * FROM stores WHERE id=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            store = new Store(row['city'], row['address'], row['postalCode']);
            store.id = row['id'];
            resolve(store);
          } else {
            reject("No store found");
          }
        }, StoresDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, StoresDBService.errorHandler, () => {
        console.log('Success: stores select transaction successful');
      });
    });
  }

  public delete(store: Store, callback) {
    function txFunction(tx: any) {
      let sql: string = 'DELETE FROM stores WHERE id=?;';
      let options = [store.id];

      tx.executeSql(sql, options, callback, StoresDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, StoresDBService.errorHandler, () => {
      console.log('Success: stores delete transaction successful');
    });
  }

  public update(store: Store, callback) {
    function txFunction(tx: any) {
      let sql: string = 'UPDATE stores SET city=?, address=?, postalCode=? WHERE id=?;';
      let options = [store.city, store.address, store.postalCode, store.id];

      tx.executeSql(sql, options, callback, StoresDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, StoresDBService.errorHandler, () => {
      console.log('Success: stores update transaction successful');
    });
  }

}
