import { Component, OnInit } from '@angular/core';
import {Store} from "../models/store.model";
import {ActivatedRoute} from "@angular/router";
import {StoresDBService} from "../services/stores-db.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-modifystorespage',
  templateUrl: './modifystorespage.component.html',
  styleUrls: ['./modifystorespage.component.css']
})
export class ModifystorespageComponent implements OnInit {
  errors: string = "";
  store: Store = new Store();

  constructor(private activatedRoute: ActivatedRoute, private storesDB: StoresDBService) { }

  ngOnInit(): void {
    let id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.storesDB.select(id).then(data => {
      this.store = data;
      console.info(data);
    }).catch(err => {
      console.error(err);
    });
  }

  btnUpdate_click() {
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
