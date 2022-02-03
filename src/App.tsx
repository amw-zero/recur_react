import React from 'react'; 
import { Formik, Form, Field } from "formik";
import { Application as Client, RecurringTransaction } from "./generated-client";
import { observer } from 'mobx-react-lite';
import { Navbar } from './Navbar';
import { useStore } from './store';
import { RecurringTransactions } from './RecurringTransactions';

type FormValues = { amount: number, name: string };

const App = observer(() => {
  const client = useStore();
  const handleSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (s: boolean) => void }) => {
    client.create_recurring_transactionClient(values);
    setSubmitting(false);
  };

  return (
    <div className="App">
      <Navbar />
      <RecurringTransactions />
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
      {client.recurring_transactions.map((rt: RecurringTransaction) => {
        return (
          <p key={rt.name}>{`${rt.name}: ${rt.amount}`}</p>
        )
      })}
    </div>
  );
});

export default App;
