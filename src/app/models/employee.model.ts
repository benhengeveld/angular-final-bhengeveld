import {Store} from "./store.model";

export class Employee{
  id: number = -1;
  firstName: string = "";
  lastName: string = "";
  storeId: number = -1;

  store: Store = new Store();

  constructor(firstName?: string, lastName?: string, storeId?: number){
    this.firstName = firstName;
    this.lastName = lastName;
    this.storeId = storeId;
  }
}
