import React from 'react'; 
import { Formik, Form, Field } from "formik";
import { Application as Client, RecurringTransaction } from "./generated-client";
import { observer } from 'mobx-react-lite';

type FormValues = { amount: number, name: string };

const App = observer(({client}: { client: Client }) => {
  const handleSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (s: boolean) => void }) => {
    const { amount, name } = values;
    let rt = new RecurringTransaction();
    rt.amount = amount;
    rt.name = name;
    client.create_recurring_transactionClient(rt);
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
      {client.recurring_transactions.map((rt: RecurringTransaction) => {
        return (
          <p key={rt.name}>{`${rt.name}: ${rt.amount}`}</p>
        )
      })}
    </div>
  );
});

export default App;
