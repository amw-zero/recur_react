export interface RecurringTransaction {
  id: number;
amount: number;
name: string;
recurrence_rule: string
}

export interface RecurringTransactionCreateReq {
amount: number;
name: string;
recurrence_rule: string;
}

export interface CreateRecurringTransaction {
  amount: number;
  name: String;
}

export class Application {
  constructor(config: (a: Application) => void) {
  config(this) }

recurring_transactions: RecurringTransaction[] = [];

async create_recurring_transaction(rtc: CreateRecurringTransaction) {
  let resp = await fetch("http://localhost:3000/recurring_transactions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(rtc) });
  let rt = await resp.json()
  console.log({createdTransaction: rt});
  this.recurring_transactions.push(rt);
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
  let data = await fetch("http://localhost:3000/recurring_transactions", { method: "GET", headers: { "Content-Type": "application/json" } });
this.recurring_transactions = await data.json();
 }
}