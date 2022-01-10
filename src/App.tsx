// import React from 'react'; 
import { Implementation, Server, Client, RecurrenceRuleType } from "./recur";
import { Formik, Form, Field } from "formik";

const kernel = new Implementation(new Client(), new Server());

type FormValues = { amount: number, name: string };

const App = () => {
  const handleSubmit = (values: FormValues) => {
    const { amount, name } = values;
    kernel.addRecurringTransaction({ amount, name, recurrence_rule: { type: RecurrenceRuleType.WEEKLY } })
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
      {kernel.viewRecurringTransactions().map((rt) => {
        return (
          <p key={rt.name}>{rt.name}</p>
        )
      })}
    </div>
  );
}

export default App;
