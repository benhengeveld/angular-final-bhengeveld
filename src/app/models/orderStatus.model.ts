export class OrderStatus{
  id: number = -1;
  status: string = "";

  constructor(status?: string){
    this.status = status;
  }
}
