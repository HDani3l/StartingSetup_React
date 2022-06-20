import React, { useState } from "react";
import "./NewExpense.css";
import ExpenseWindow from "./ExpenseWindow";
const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData
      };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };
  const startEditing = () => {
    setIsEditing(true);
  };
  const stopEditingHandler=()=>{
    setIsEditing(false);
  }
  return (
    <div className="new-expense">
      {!isEditing && <button onClick={startEditing}>Add New Expense</button>}
      {isEditing && <ExpenseWindow onCancel={stopEditingHandler} onSaveExpenseData={saveExpenseDataHandler}           id=''
          title=''
          amount=''
          date=''/>}
    </div>
  );
};
export default NewExpense;
