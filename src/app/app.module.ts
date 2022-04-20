import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingspageComponent } from './settingspage/settingspage.component';
import { NavComponent } from './nav/nav.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StorespageComponent } from './storespage/storespage.component';
import { ItemspageComponent } from './itemspage/itemspage.component';
import { OrderspageComponent } from './orderspage/orderspage.component';
import { EmployeespageComponent } from './employeespage/employeespage.component';
import { AddstorespageComponent } from './addstorespage/addstorespage.component';
import {FormsModule} from "@angular/forms";
import { ModifystorespageComponent } from './modifystorespage/modifystorespage.component';
import { ModifyitemspageComponent } from './modifyitemspage/modifyitemspage.component';
import { AdditemspageComponent } from './additemspage/additemspage.component';
import { AddemployeespageComponent } from './addemployeespage/addemployeespage.component';
import { ModifyemployeespageComponent } from './modifyemployeespage/modifyemployeespage.component';
import { ModifyorderspageComponent } from './modifyorderspage/modifyorderspage.component';
import { AddorderspageComponent } from './addorderspage/addorderspage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingspageComponent,
    NavComponent,
    HomepageComponent,
    StorespageComponent,
    ItemspageComponent,
    OrderspageComponent,
    EmployeespageComponent,
    AddstorespageComponent,
    ModifystorespageComponent,
    ModifyitemspageComponent,
    AdditemspageComponent,
    AddemployeespageComponent,
    ModifyemployeespageComponent,
    ModifyorderspageComponent,
    AddorderspageComponent,
    AboutpageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
