import { Injectable } from '@angular/core';

declare function openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess): any;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: any = null;

  constructor() { }

  private static errorHandler(error): any {
    console.error("Error: " + error);
  }

  private createDatabase(): void {
    let shortName = "TireStoreDB";
    let version = "1.0";
    let displayName = "DB for Angular TireStore App";
    let dbSize = 2 * 1024 * 1024;


    this.db = openDatabase(shortName, version, displayName, dbSize, () => {
      console.log("Success: Database created successfully");
    });
  }

  private createTables(): void {
    function txFunction(tx: any): void {
      let sql: string = "CREATE TABLE IF NOT EXISTS items(" +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " name VARCHAR(25) NOT NULL," +
        " price DOUBLE);";
      let options = [];

      tx.executeSql(sql, options, () => {
        console.info("Success: items create table successful");
      }, DatabaseService.errorHandler);

      sql = "CREATE TABLE IF NOT EXISTS stores(" +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " city VARCHAR(25) NOT NULL," +
        " address VARCHAR(25) NOT NULL," +
        " postalCode VARCHAR(25) NOT NULL);";

      tx.executeSql(sql, options, () => {
        console.info("Success: stores create table successful");
      }, DatabaseService.errorHandler);

      sql = "CREATE TABLE IF NOT EXISTS employees(" +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " firstName VARCHAR(25) NOT NULL," +
        " lastName VARCHAR(25) NOT NULL," +
        " storeId INTEGER," +
        " FOREIGN KEY (storeId) REFERENCES stores(id));";

      tx.executeSql(sql, options, () => {
        console.info("Success: employees create table successful");
      }, DatabaseService.errorHandler);

      sql = "DROP TABLE IF EXISTS order_status";

      tx.executeSql(sql, options, () => {
        console.info("Success: order_status drop table successful");
      }, DatabaseService.errorHandler);

      sql = "CREATE TABLE IF NOT EXISTS order_status(" +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " status VARCHAR(25) NOT NULL);";

      tx.executeSql(sql, options, () => {
        console.info("Success: order_status create table successful");
      }, DatabaseService.errorHandler);

      sql = "INSERT INTO order_status(id, status) VALUES(1, 'Pending');";

      tx.executeSql(sql, options, () => {
        console.info("Success: order_status insert successful");
      }, DatabaseService.errorHandler);

      sql = "INSERT INTO order_status(id, status) VALUES(2, 'Outbound');";

      tx.executeSql(sql, options, () => {
        console.info("Success: order_status insert successful");
      }, DatabaseService.errorHandler);

      sql = "INSERT INTO order_status(id, status) VALUES(3, 'Delivered');";

      tx.executeSql(sql, options, () => {
        console.info("Success: order_status insert successful");
      }, DatabaseService.errorHandler);

      sql = "CREATE TABLE IF NOT EXISTS orders(" +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " storeId INTEGER NOT NULL," +
        " itemId INTEGER NOT NULL," +
        " quantity INTEGER NOT NULL," +
        " orderStatusId INTEGER," +
        " FOREIGN KEY (storeId) REFERENCES stores(id)," +
        " FOREIGN KEY (itemId) REFERENCES items(id)," +
        " FOREIGN KEY (orderStatusId) REFERENCES order_status(id));";

      tx.executeSql(sql, options, () => {
        console.info("Success: orders create table successful");
      }, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Table creation transaction successful");
    });
  }

  private dropTables(): void {
    function txFunction(tx: any): void {
      let sql: string = "DROP TABLE IF EXISTS orders";
      let options = [];

      tx.executeSql(sql, options, () => {
        console.info("Success: orders drop table successful");
      }, DatabaseService.errorHandler);

      sql = "DROP TABLE IF EXISTS employees";

      tx.executeSql(sql, options, () => {
        console.info("Success: employees drop table successful");
      }, DatabaseService.errorHandler);

      sql = "DROP TABLE IF EXISTS stores";

      tx.executeSql(sql, options, () => {
        console.info("Success: stores drop table successful");
      }, DatabaseService.errorHandler);

      sql = "DROP TABLE IF EXISTS items";

      tx.executeSql(sql, options, () => {
        console.info("Success: items drop table successful");
      }, DatabaseService.errorHandler);

      sql = "DROP TABLE IF EXISTS order_status";

      tx.executeSql(sql, options, () => {
        console.info("Success: order_status drop table successful");
      }, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Table drop transaction successful");
    });
  }

  public clearDB(): void{
    let result = confirm("Do you really want to clear the database?");
    if(result){
      this.dropTables();
      this.db = null;
      alert("Database cleared!");
    }
  }

  public initDB(): void {
    if (this.db == null) {
      try {
        //create database
        this.createDatabase();
        //create tables
        this.createTables();
      } catch (e) {
        console.error("Error in initDB(): " + e);
      }
    }
  }

  public getDatabase(): any {
    this.initDB();
    return this.db;
  }
}
