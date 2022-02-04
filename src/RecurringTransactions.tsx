import { observer } from "mobx-react-lite";
import { RecurringTransaction } from "./generated-client";
import { client, useStore } from "./store";

const RecurringTransactionRow = observer(({ recurringTransaction }: { recurringTransaction: RecurringTransaction}) => {
  return (
    <tr>
      <th>{recurringTransaction.name}</th>
      <td>{recurringTransaction.amount}</td>
      <td>
        <button onClick={() => client.delete_recurring_transactionClient(recurringTransaction)}>Delete</button>
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