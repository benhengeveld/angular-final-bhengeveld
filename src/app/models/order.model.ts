import {Store} from "./store.model";
import {Item} from "./item.model";
import {OrderStatus} from "./orderStatus.model";

export class Order{
  id: number = -1;
  storeId: number = -1;
  itemId: number = -1;
  quantity: number = 0;
  orderStatusId: number = -1;

  store: Store = new Store();
  item: Item = new Item();
  orderStatus: OrderStatus = new OrderStatus();

  constructor(storeId?: number, itemId?: number, quantity?: number, orderStatusId?: number){
    this.storeId = storeId;
    this.itemId = itemId;
    this.quantity = quantity;
    this.orderStatusId = orderStatusId;
  }
}
