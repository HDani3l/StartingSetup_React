import React, { useState, useEffect, useCallback, Fragment } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [expenses, setExpenses] = useState([]);

  const fetchExpenseHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-4098f-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const loadedExpenses = [];
      for (const key in data) {
        const date = new Date(data[key].date);
        loadedExpenses.push({
          id: key,
          title: data[key].title,
          date: date,
          amount: data[key].amount,
        });
      }
      setExpenses(loadedExpenses);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchExpenseHandler();
  }, [fetchExpenseHandler]);

  async function addExpenseHandler(expense) {
    const response = await fetch(
      "https://react-http-4098f-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    fetchExpenseHandler();
  }

  async function modExpenseHandler(expense) {
    const response = await fetch(
      `https://react-http-4098f-default-rtdb.firebaseio.com/expenses/${expense.id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    fetchExpenseHandler();
  }

  async function deleteExpenseHandler(expense) {
    const response = await fetch(
      `https://react-http-4098f-default-rtdb.firebaseio.com/expenses/${expense.id}.json`,
      {
        method: "DELETE",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    fetchExpenseHandler();
  }

  return (
    <Fragment>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses
        onModExpense={modExpenseHandler}
        onDeleteExpense={deleteExpenseHandler}
        expenses={expenses}
        isLoading={isLoading}
        error={error}
      />
      ;
    </Fragment>
  );
};

export default App;
