import { Injectable } from '@angular/core';
import {DatabaseService} from "./database.service";
import {Employee} from "../models/employee.model";
import {Store} from "../models/store.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeesDBService {

  constructor(private database: DatabaseService) { }

  private static errorHandler(error): any {
    console.error("Error: " + error);
  }

  //crud operations
  public insert(employee: Employee, callback) {
    function txFunction(tx: any) {
      let sql: string = 'INSERT INTO employees(firstName, lastName, storeId) VALUES(?,?,?);';
      let options = [employee.firstName, employee.lastName, employee.storeId];

      tx.executeSql(sql, options, callback, EmployeesDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, EmployeesDBService.errorHandler, () => {
      console.log('Success: employees insert transaction successful');
    });
  }

  public selectAll(): Promise<any> {
    let options = [];
    let employees: Employee[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT e.id, e.firstName, e.lastName, e.storeId, s.id AS s_id, s.city, s.address, s.postalCode FROM employees AS e JOIN stores AS s ON e.storeId = s.id;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let employee = new Employee(row['firstName'], row['lastName'], row['storeId']);
              employee.id = row['id'];
              let store: Store = new Store(row['city'], row['address'], row['postalCode']);
              store.id = row['s_id'];
              employee.store = store;
              employees.push(employee);
            }
            resolve(employees);
          } else {
            reject("No employees found");
          }
        }, EmployeesDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, EmployeesDBService.errorHandler, () => {
        console.log('Success: employees selectAll transaction successful');
      });
    });
  }

  public selectAllWhereStore(storeId: number): Promise<any> {
    let options = [storeId];
    let employees: Employee[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT e.id, e.firstName, e.lastName, e.storeId, s.id AS s_id, s.city, s.address, s.postalCode FROM employees AS e JOIN stores AS s ON e.storeId = s.id WHERE storeId=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let employee = new Employee(row['firstName'], row['lastName'], row['storeId']);
              employee.id = row['id'];
              let store: Store = new Store(row['city'], row['address'], row['postalCode']);
              store.id = row['s_id'];
              employee.store = store;
              employees.push(employee);
            }
            resolve(employees);
          } else {
            reject("No employees found");
          }
        }, EmployeesDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, EmployeesDBService.errorHandler, () => {
        console.log('Success: employees selectAll transaction successful');
      });
    });
  }

  public select(id: number): Promise<any> {
    let options = [id];
    let employee: Employee = null;

    return new Promise((resolve, reject) => {

      function txFunction(tx) {
        let sql = "SELECT e.id, e.firstName, e.lastName, e.storeId, s.id AS s_id, s.city, s.address, s.postalCode FROM employees AS e JOIN stores AS s ON e.storeId = s.id WHERE e.id=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            employee = new Employee(row['firstName'], row['lastName'], row['storeId']);
            employee.id = row['id'];
            let store: Store = new Store(row['city'], row['address'], row['postalCode']);
            store.id = row['s_id'];
            employee.store = store;
            resolve(employee);
          } else {
            reject("No employee found");
          }
        }, EmployeesDBService.errorHandler);
      }

      this.database.getDatabase().transaction(txFunction, EmployeesDBService.errorHandler, () => {
        console.log('Success: employees select transaction successful');
      });
    });
  }

  public delete(employee: Employee, callback) {
    function txFunction(tx: any) {
      let sql: string = 'DELETE FROM employees WHERE id=?;';
      let options = [employee.id];

      tx.executeSql(sql, options, callback, EmployeesDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, EmployeesDBService.errorHandler, () => {
      console.log('Success: employees delete transaction successful');
    });
  }

  public update(employee: Employee, callback) {
    function txFunction(tx: any) {
      let sql: string = 'UPDATE employees SET firstName=?, lastName=?, storeId=? WHERE id=?;';
      let options = [employee.firstName, employee.lastName, employee.storeId, employee.id];

      tx.executeSql(sql, options, callback, EmployeesDBService.errorHandler);
    }

    this.database.getDatabase().transaction(txFunction, EmployeesDBService.errorHandler, () => {
      console.log('Success: employees update transaction successful');
    });
  }

}
