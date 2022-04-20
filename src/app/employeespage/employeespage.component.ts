import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from "../models/employee.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {EmployeesDBService} from "../services/employees-db.service";
import {StoresDBService} from "../services/stores-db.service";
import {Store} from "../models/store.model";

@Component({
  selector: 'app-employeespage',
  templateUrl: './employeespage.component.html',
  styleUrls: ['./employeespage.conponent.css']
})
export class EmployeespageComponent implements OnInit, OnDestroy {
  navigationSubscription;
  employees: Employee[] = [];
  store: Store = null;

  constructor(private activatedRoute: ActivatedRoute, private employeesDB: EmployeesDBService, private storesDB: StoresDBService, private router: Router, private route: ActivatedRoute) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    this.store = null;
    this.employees = [];
    let storeId = Number(this.route.snapshot.queryParamMap.get('storeId'));

    if(this.route.snapshot.queryParamMap.get('storeId') == null){
      this.employeesDB.selectAll()
        .then(data => {
          this.employees = data;
          console.info(data);
        })
        .catch(err => {
          this.employees = [];
          console.error(err);
        });
    }else{
      if(isNaN(storeId)){
        this.router.navigate(['employees']);
      }else{
        this.employeesDB.selectAllWhereStore(storeId)
          .then(data => {
            this.employees = data;
            console.info(data);
          })
          .catch(err => {
            this.employees = [];
            console.error(err);
          });

        this.storesDB.select(storeId)
          .then(data => {
            this.store = data;
            console.info(data);
          })
          .catch(err => {
            this.store = null;
            console.error(err);
          });
      }
    }
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  btnAdd_click() {
    this.router.navigate(['addEmployee']);
  }

  btnModify_click(employee: Employee) {
    this.router.navigate(['modifyEmployee/' + employee.id]);
  }

  btnDelete_click(employee: Employee) {
    this.employeesDB.delete(employee, () => {
      alert("Record deleted successfully")
    });
    this.initialiseInvites();
  }

  btnBack_click() {
    this.router.navigate(['employees']);
  }

}
