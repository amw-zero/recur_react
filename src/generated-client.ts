export class RecurringTransaction {
amount: number = 0;
name: string = "";

}

export class Application {
  constructor(config: (a: Application) => void) {
  config(this) }

recurring_transactions: RecurringTransaction[] = [];
create_recurring_transactionClient(rt: RecurringTransaction) {
  fetch("http://localhost:3000/recurring_transactions", { method: "POST", body: JSON.stringify(rt), headers: { "Content-Type": "application/json" } });
this.recurring_transactions.push(rt);
 }

delete_recurring_transactionClient(rt: RecurringTransaction) {
  fetch("http://localhost:3000/recurring_transactions", { method: "DELETE", body: JSON.stringify(rt), headers: { "Content-Type": "application/json" } });
this.recurring_transactions.push(rt);
 }

update_recurring_transactionClient(rt: RecurringTransaction) {
  fetch("http://localhost:3000/recurring_transactions", { method: "PUT", body: JSON.stringify(rt), headers: { "Content-Type": "application/json" } });
this.recurring_transactions.push(rt);
 }

view_recurring_transactions() {
  this.recurring_transactions }


}