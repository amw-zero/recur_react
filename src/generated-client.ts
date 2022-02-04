export interface RecurringTransaction {
  id: number;
amount: number;
name: string;
}

export interface RecurringTransactionCreateReq {
amount: number;
name: string;
}

export class Application {
  constructor(config: (a: Application) => void) {
  config(this) }

recurring_transactions: RecurringTransaction[] = [];
create_recurring_transactionClient(rt: RecurringTransactionCreateReq) {
  fetch("http://localhost:3000/recurring_transactions", { method: "POST", body: JSON.stringify(rt), headers: { "Content-Type": "application/json" } });
this.recurring_transactions.push({...rt, id: 1});
 }

 delete_recurring_transactionClient(rt: RecurringTransaction) {
  fetch("http://localhost:3000/recurring_transactions/" + rt.id, { method: "DELETE", headers: { "Content-Type": "application/json" } });
this.recurring_transactions = this.recurring_transactions.filter((data) => {
 return data.id !== rt.id });
 }
 
update_recurring_transactionClient(rt: RecurringTransaction) {
  fetch("http://localhost:3000/recurring_transactions", { method: "PUT", body: JSON.stringify(rt), headers: { "Content-Type": "application/json" } });
this.recurring_transactions.push(rt);
 }

 async view_recurring_transactionsClient() {
  const rts = await fetch("http://localhost:3000/recurring_transactions", { method: "GET", headers: { "Content-Type": "application/json" } });
  const rts_json = await rts.json();
  this.recurring_transactions = rts_json;
 }


}