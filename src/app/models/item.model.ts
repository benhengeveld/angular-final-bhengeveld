export class Item{
  id: number = -1;
  name: string = "";
  price: number = 0;

  constructor(name?: string, price?: number){
    this.name = name;
    this.price = price;
  }
}
