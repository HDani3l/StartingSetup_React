import React, { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
const DUMMY_EXPENSES = [
  { title: "EAT", amount: 99.99, date: new Date(2022, 1, 12) },
  { title: "SLEEP", amount: 199.99, date: new Date(2022, 1, 12) },
  { title: "RAVE", amount: 299.99, date: new Date(2022, 1, 12) },
  { title: "REPEAT", amount: 399.99, date: new Date(2022, 1, 12) },
];
const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const addExpenseHandler = (expense) => {
    setExpenses(prevExpenses=>{
      return [expense, ...prevExpenses];
    });
  };
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses} />
    </div>
  );
};

export default App;
