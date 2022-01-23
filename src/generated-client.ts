export class RecurringTransaction {

  amount: number = 0;
  name: string = "";
  
}

  export class Application {
    constructor(config: (a: Application) => void) {
    config(this) }
  
  recurring_transactions: RecurringTransaction[] = [];

  addClient(rt: RecurringTransaction) {
    fetch("http://localhost:3000/recurring_transactions", { method: "POST", body: JSON.stringify(rt), 
      headers: { "Content-Type": "application/json" } });
  this.recurring_transactions.push(rt);
   }
  
  removeClient(rt: RecurringTransaction) {
    fetch("localhost:3000/recurring_transactions", { method: "DELETE", body: JSON.stringify(rt) });
    this.recurring_transactions.push(rt);
   }
  
  updateClient(rt: RecurringTransaction) {
    fetch("localhost:3000/recurring_transactions", { method: "PUT", body: JSON.stringify(rt) });
    this.recurring_transactions.push(rt);
   }
  
  view() {
    return this.recurring_transactions }
  
  
  }
  