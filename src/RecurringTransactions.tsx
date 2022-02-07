import { observer } from "mobx-react-lite";
import { RecurringTransaction } from "./generated-client";
import { client, useStore } from "./store";

const RecurringTransactionRow = observer(({ recurringTransaction }: { recurringTransaction: RecurringTransaction}) => {
  return (
    <tr>
      <th>{recurringTransaction.name}</th>
      <td>{recurringTransaction.amount}</td>
      <td>{recurringTransaction.recurrence_rule}</td>
      <td>
        <button className="button is-danger" onClick={() => client.delete_recurring_transactionClient(recurringTransaction)}>Delete</button>
      </td>
    </tr>
  );
});

export const RecurringTransactions = observer(() => {
  const client = useStore();

  return (
    <table className="table">
      <thead>
        <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Recurrence rule</th>
            <th></th>
        </tr>
      </thead>
      <tbody>
        {client.recurring_transactions.map(rt => (
            <RecurringTransactionRow recurringTransaction={rt} />
        ))}
      </tbody>
    </table>
  );
});