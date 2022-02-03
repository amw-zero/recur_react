import { Field, Form, Formik } from "formik";
import { useStore } from "./store";

type FormValues = { amount: number, name: string };

export const RecurringTransactionForm = () => {
  const client = useStore();
  const handleSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (s: boolean) => void }) => {
    client.create_recurring_transactionClient(values);
    setSubmitting(false);
  };

  return (
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
  );
}
