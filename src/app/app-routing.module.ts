import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingspageComponent} from "./settingspage/settingspage.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {StorespageComponent} from "./storespage/storespage.component";
import {ItemspageComponent} from "./itemspage/itemspage.component";
import {OrderspageComponent} from "./orderspage/orderspage.component";
import {EmployeespageComponent} from "./employeespage/employeespage.component";
import {AddstorespageComponent} from "./addstorespage/addstorespage.component";
import {ModifystorespageComponent} from "./modifystorespage/modifystorespage.component";
import {AdditemspageComponent} from "./additemspage/additemspage.component";
import {ModifyitemspageComponent} from "./modifyitemspage/modifyitemspage.component";
import {AddemployeespageComponent} from "./addemployeespage/addemployeespage.component";
import {ModifyemployeespageComponent} from "./modifyemployeespage/modifyemployeespage.component";
import {AddorderspageComponent} from "./addorderspage/addorderspage.component";
import {ModifyorderspageComponent} from "./modifyorderspage/modifyorderspage.component";
import {AboutpageComponent} from "./aboutpage/aboutpage.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path:'stores', component: StorespageComponent},
  {path:'addStore', component: AddstorespageComponent},
  {path:'modifyStore/:id', component: ModifystorespageComponent},
  {path:'items', component: ItemspageComponent},
  {path:'addItem', component: AdditemspageComponent},
  {path:'modifyItem/:id', component: ModifyitemspageComponent},
  {path:'orders', component: OrderspageComponent, runGuardsAndResolvers: 'always'},
  {path:'addOrder', component: AddorderspageComponent},
  {path:'modifyOrder/:id', component: ModifyorderspageComponent},
  {path:'employees', component: EmployeespageComponent, runGuardsAndResolvers: 'always'},
  {path:'addEmployee', component: AddemployeespageComponent},
  {path:'modifyEmployee/:id', component: ModifyemployeespageComponent},
  {path: 'settings', component: SettingspageComponent},
  {path: 'about', component: AboutpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
