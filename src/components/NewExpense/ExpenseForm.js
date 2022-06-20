import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [id, setId] = useState(props.id);
  const [enteredTitle, setEnteredTitle] = useState(props.title);
  const [enteredAmount, setEnteredAmount] = useState(props.amount);
  const [enteredDate, setEnteredDate] = useState(new Date(props.date).toLocaleDateString('en-CA'));
  const titleChanceHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const amountChanceHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const dateChanceHandler = (event) => {
    setEnteredDate(event.target.value);
  };
  const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};
  const submitHandler = (event) => {
    event.preventDefault();
    if(id===""){     
      const date = new Date().toISOString().slice(0, 16); 
       const hash = cyrb53(date);
       setId(hash);
    }
    const expenseData = {
        id: id,
        title: enteredTitle,
        amount: +enteredAmount,
        date: new Date(enteredDate),
      };
    props.onSaveExpenseData(expenseData);
    setId("");
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };
  const buttonLabel = id===""?"Add Expense":"Update Expense";


  return (
      <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChanceHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.00"
            step="0.01"
            value={enteredAmount}
            onChange={amountChanceHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChanceHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">{buttonLabel}</button>
        <button type="button" onClick={props.onCancel}>Cancel</button>

      </div>
    </form>
   
  );
};
export default ExpenseForm;
