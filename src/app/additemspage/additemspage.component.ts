import { Component, OnInit } from '@angular/core';
import {Item} from "../models/item.model";
import {ItemsDBService} from "../services/items-db.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-additemspage',
  templateUrl: './additemspage.component.html',
  styleUrls: ['./additemspage.component.css']
})
export class AdditemspageComponent implements OnInit {
  errors: string = "";
  item: Item = new Item("", 0);

  constructor(private itemsDB: ItemsDBService) { }

  ngOnInit(): void {
  }

  btnAdd_click() {
    this.errors = "";
    let nameControl = new FormControl(this.item.name, Validators.compose([Validators.minLength(1), Validators.maxLength(40), Validators.required]));
    let priceControl = new FormControl(this.item.name, Validators.compose([Validators.min(0), Validators.required]));

    if(nameControl.errors != null || priceControl.errors != null){
      if(nameControl.errors != null){
        this.errors += ", Name must be 1 long and 40 short";
      }
      if(priceControl.errors != null){
        this.errors += ", Price must be 0 or above";
      }
      this.errors = this.errors.substring(2, this.errors.length)
    }else{
      this.itemsDB.insert(this.item, () => {
        console.log("Record added successfully");
        alert("Record added successfully");
      });
    }
  }

}
