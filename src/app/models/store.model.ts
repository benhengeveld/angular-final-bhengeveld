export class Store{
  id: number = -1;
  city: string = "";
  address: string = "";
  postalCode: string = "";

  constructor(city?: string, address?: string, postalCode?: string){
    this.city = city;
    this.address = address;
    this.postalCode = postalCode;
  }
}
