import { makeAutoObservable } from "mobx";

export class RecurringTransaction {
    amount: number = 0;
    name: string = "";
}

export class Scenario {
    name: any;
    recurring_transactions:any;
}

export class Application {
    recurring_transactions: RecurringTransaction[] = [];
    scenarios: Scenario[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addClient(rt: RecurringTransaction) { 
        fetch("http://localhost:3000/recurring_transactions", { method: "POST", body: JSON.stringify(rt) });
        this.recurring_transactions.push(rt);
    }
    
    removeClient(rt: RecurringTransaction) { fetch("http://localhost:3000/recurring_transactions", { method: "POST", body: JSON.stringify(rt) }) }
    
    updateClient(rt: RecurringTransaction) { fetch("http://localhost:3000/recurring_transactions", { method: "POST", body: JSON.stringify(rt) }) }
    
    add_scenarioClient(s: RecurringTransaction) { fetch("http://localhost:3000/scenarios", { method: "POST", body: JSON.stringify(s) }) }

  }