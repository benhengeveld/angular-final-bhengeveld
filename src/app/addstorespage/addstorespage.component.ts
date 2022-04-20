import { Component, OnInit } from '@angular/core';
import {StoresDBService} from "../services/stores-db.service";
import {Store} from "../models/store.model";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-addstorespage',
  templateUrl: './addstorespage.component.html',
  styleUrls: ['./addstorespage.component.css']
})
export class AddstorespageComponent implements OnInit {
  errors: string = "";
  store: Store = new Store("","","");

  constructor(private storesDB: StoresDBService) { }

  ngOnInit(): void {
  }

  btnAdd_click() {
    this.errors = "";

    let cityControl = new FormControl(this.store.city, Validators.compose([Validators.minLength(1), Validators.maxLength(40), Validators.required]));
    let addressControl = new FormControl(this.store.address, Validators.compose([Validators.minLength(1), Validators.maxLength(40), Validators.required]));
    let postalCodeControl = new FormControl(this.store.postalCode, Validators.compose([Validators.pattern('^[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]$'), Validators.required]));

    if(cityControl.errors != null || addressControl.errors != null || postalCodeControl.errors != null){
      if(cityControl.errors != null){
        this.errors += ", City must be 1 long and 40 short";
      }
      if(addressControl.errors != null){
        this.errors += ", Address must be 1 long and 40 short";
      }
      if(postalCodeControl.errors != null){
        this.errors += ", Must be a A1A 1A1";
      }
      this.errors = this.errors.substring(2, this.errors.length)
    }else{
      this.storesDB.insert(this.store, () => {
        console.log("Record added successfully");
        alert("Record added successfully");
      });
    }
  }

}
