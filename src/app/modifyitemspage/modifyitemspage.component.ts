import { Component, OnInit } from '@angular/core';
import {Item} from "../models/item.model";
import {ActivatedRoute} from "@angular/router";
import {ItemsDBService} from "../services/items-db.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-modifyitemspage',
  templateUrl: './modifyitemspage.component.html',
  styleUrls: ['./modifyitemspage.component.css']
})
export class ModifyitemspageComponent implements OnInit {
  errors: string = "";
  item: Item = new Item();

  constructor(private activatedRoute: ActivatedRoute, private itemsDB: ItemsDBService) { }

  ngOnInit(): void {
    let id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.itemsDB.select(id).then(data => {
      this.item = data;
      console.info(data);
    }).catch(err => {
      console.error(err);
    });
  }

  btnUpdate_click() {
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
