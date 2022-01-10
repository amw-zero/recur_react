import alasql from "alasql";

export enum RecurrenceRuleType {
    WEEKLY,
    MONTHLY,
}

type RecurrenceRule = { type: RecurrenceRuleType.WEEKLY }

export type RecurringTransaction = {
    amount: number,
    name: string,
    recurrence_rule: RecurrenceRule,
}

class Spec {
    recurringTransactions: RecurringTransaction[] = []

    addRecurringTransaction(rt: RecurringTransaction) {
        this.recurringTransactions.push(rt);
    }
}

// Impl

function initDatabase() {
    alasql("CREATE TABLE recurring_transactions (name varchar(128), amount numeric(6), recurrence_rule varchar(128))");

//    return database;
}

export class Client {

}

type ServerRequest = {
    uri: string,
    body: string | null,
    method: "GET" | "POST"
}

type ServerResponse = string;

const RECURRING_TRANSACTIONS_URI = "recurring_transactions/";
const HTTP_GET = "GET";
const HTTP_POST = "POST";

function endpointKey(method: string, uri: string): string {
    return `${method}/${uri}`;
}

type Router = Record<string, (r: ServerRequest) => ServerResponse>;

export class Server {
    router: Router;

    constructor() {
        this.router = {
            [endpointKey(HTTP_POST, RECURRING_TRANSACTIONS_URI)]: this.addRecurringTransaction,
            [endpointKey(HTTP_GET, RECURRING_TRANSACTIONS_URI)]: this.viewRecurringTransactions
        }
    }

    request(r: ServerRequest): ServerResponse {
        return this.router[endpointKey(r.method, r.uri)](r)
    }

    addRecurringTransaction(r: ServerRequest): ServerResponse {
        const recurringTransaction = JSON.parse(r.body!);
        alasql("INSERT INTO recurring_transactions (?, ? ,?)", [recurringTransaction.name, recurringTransaction.amount, "fake rule"]);

        return "ok"
    }

    viewRecurringTransactions(): ServerResponse {
        const recurringTransactions: RecurringTransaction[] = alasql("SELECT * FROM recurring_transactions");

        return JSON.stringify(recurringTransactions);
    }
}

export class Implementation {
    server: Server
    client: Client

    constructor(client: Client, server: Server) {
        this.client = client;
        this.server = server;
    }

    addRecurringTransaction(rt: RecurringTransaction) {
        this.server.request({ 
            uri: RECURRING_TRANSACTIONS_URI, 
            method: HTTP_POST, 
            body: JSON.stringify(rt) 
        });
    }

    viewRecurringTransactions(): RecurringTransaction[] {
        const response = this.server.request({
            uri: RECURRING_TRANSACTIONS_URI,
            method: HTTP_GET,
            body: null,
        });

        return JSON.parse(response);
    }
}

const rt: RecurringTransaction = { amount: 50.0, name: "Babysitter", recurrence_rule: { type: RecurrenceRuleType.WEEKLY } };

console.log("Abstract spec execution");

let spec = new Spec();
spec.addRecurringTransaction(rt);

console.log(spec);

console.log("Implementation execution");

initDatabase();
let impl = new Implementation(new Client(), new Server());
impl.addRecurringTransaction(rt);

console.log(impl.viewRecurringTransactions());
