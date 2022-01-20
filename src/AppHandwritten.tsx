import React, { useEffect, useState } from 'react'; 
import { Implementation, Server, Client, RecurrenceRuleType, RecurringTransaction } from "./recur";
import { Formik, Form, Field } from "formik";

const kernel = new Implementation(new Client(), new Server());

type FormValues = { amount: number, name: string };

const App = () => {
  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([]);

  useEffect(() => {
    let rts = kernel.viewRecurringTransactions();
    setRecurringTransactions(rts);
  }, []);
  
  function applyK<T> (action: (k: Implementation) => T, stateSetter: React.Dispatch<React.SetStateAction<T>>) {
    let data = action(kernel);

    stateSetter(data);
  }

  const handleSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (s: boolean) => void }) => {
    const { amount, name } = values;
    applyK(
      (k) => {
        k.addRecurringTransaction({ amount, name, recurrence_rule: { type: RecurrenceRuleType.WEEKLY } });
        return k.viewRecurringTransactions();
      },
      setRecurringTransactions
    );
    setSubmitting(false);
  };

  return (
    <div className="App">
      <Formik
        initialValues={{ amount: 0.0, name: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }: { isSubmitting: boolean}) => (
          <Form>
            <Field type="number" name="amount" />
            <Field type="string" name="name" />
            <button type="submit" disabled={isSubmitting}>
               Submit
           </button>
          </Form>
        )}
      </Formik>
      {recurringTransactions.map((rt) => {
        return (
          <p key={rt.name}>{`${rt.name}: ${rt.amount}`}</p>
        )
      })}
    </div>
  );
}

export default App;
