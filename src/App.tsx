import React from 'react'; 
import { observer } from 'mobx-react-lite';
import { Navbar } from './Navbar';
import { RecurringTransactions } from './RecurringTransactions';
import { RecurringTransactionForm } from './RecurringTransactionForm';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <RecurringTransactionForm />
      <RecurringTransactions />
      
    </div>
  );
};

export default App;
