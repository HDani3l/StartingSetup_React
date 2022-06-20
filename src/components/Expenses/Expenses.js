import React, { useState } from "react";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpnesesChart from "./ExpensesChart";
const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date.getFullYear().toString() === filteredYear;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onFilterChange={filterChangeHandler}
        />
        <ExpnesesChart expenses={filteredExpenses} />

        <ExpensesList
          onModExpense={props.onModExpense}
          onDeleteExpense={props.onDeleteExpense}
          expenses={filteredExpenses}
          isLoading={props.isLoading}
          error={props.error}
        />
      </Card>
    </div>
  );
};

export default Expenses;
