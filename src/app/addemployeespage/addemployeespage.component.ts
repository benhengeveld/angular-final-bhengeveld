import { Component, OnInit } from '@angular/core';
import {Employee} from "../models/employee.model";
import {EmployeesDBService} from "../services/employees-db.service";
import {Store} from "../models/store.model";
import {StoresDBService} from "../services/stores-db.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-addemployeespage',
  templateUrl: './addemployeespage.component.html',
  styleUrls: ['./addemployeespage.component.css']
})
export class AddemployeespageComponent implements OnInit {
  employee: Employee = new Employee("", "", 0);
  stores: Store[] = [];
  errors: string = "";

  constructor(private employeesDB: EmployeesDBService, private storesDB: StoresDBService) { }

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
    this.errors = "";
    let firstNameControl = new FormControl(this.employee.firstName, Validators.compose([Validators.minLength(1), Validators.maxLength(20), Validators.required]));
    let lastNameControl = new FormControl(this.employee.lastName, Validators.compose([Validators.minLength(1), Validators.maxLength(20), Validators.required]));

    Promise.allSettled([this.storesDB.select(this.employee.storeId)]).then(data => {
      if(data[0].status == 'rejected' || firstNameControl.errors != null || lastNameControl.errors != null){
        if(firstNameControl.errors != null){
          this.errors += ", First name must be longer then 1 and shorter then 20";
        }
        if(lastNameControl.errors != null){
          this.errors += ", Last name must be longer then 1 and shorter then 20";
        }
        if(data[0].status == 'rejected'){
          this.errors += ", Store is required";
        }
        this.errors = this.errors.substring(2, this.errors.length)
      }else{
        this.employeesDB.insert(this.employee, () => {
          console.log("Record added successfully");
          alert("Record added successfully");
        });
      }
    });
  }

}
