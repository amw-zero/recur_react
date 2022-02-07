import { Field, Form, Formik, FormikProps } from "formik";
import { TextInput, NumberInput } from "./FormControls";
import { useStore } from "./store";

// This should be a generated "CreateReq" type
type FormValues = { amount: number, name: string, recurrence_rule: string };

export const RecurringTransactionForm = () => {
  const client = useStore();
  const handleSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (s: boolean) => void }) => {
    client.create_recurring_transaction(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ amount: 0.0, name: "", recurrence_rule: "weekly;byday=Mo" }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }: FormikProps<FormValues>) => (
        <Form>
          <Field name="amount" component={NumberInput} label="Amount" placeholder="Amount" />
          <Field name="name" component={TextInput} label="Name" placeholder="Name" />
          <Field name="recurrence_rule" component={TextInput} label="Recurrence Rule" placeholder="Recurrence Rule" />

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-link">Submit</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
