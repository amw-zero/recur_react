import { observer } from "mobx-react-lite";
import { RecurringTransaction } from "./generated-client";
import { useStore } from "./store";

const RecurringTransactionRow = observer(({ recurringTransaction }: { recurringTransaction: RecurringTransaction}) => {
  return (
    <tr>
      <th>{recurringTransaction.name}</th>
      <td>{recurringTransaction.amount}</td>
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