import React, { useEffect } from 'react'; 
import { Navbar } from './Navbar';
import { RecurringTransactions } from './RecurringTransactions';
import { RecurringTransactionForm } from './RecurringTransactionForm';
import { useStore } from './store';

const App = () => {
  const client = useStore();
  useEffect(() => {
    client.view_recurring_transactionsClient();
  }, []);
  
  return (
    <div className="App">
      <Navbar />
      <RecurringTransactionForm />
      <RecurringTransactions />
    </div>
  );
};

export default App;
