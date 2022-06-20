import React, { Fragment, useState } from "react";
import "./ExpenseItem.css";
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import ExpenseWindow from "../NewExpense/ExpenseWindow";


const ExpenseItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      };
      props.onModExpense(expenseData);
      setIsEditing(false);
  };
  const deleteExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
          id:props.id,
          title:props.title,
          amount:props.amount,
          date:props.date
      };
      props.onDeleteExpense(expenseData);
     
  };

  

  const startEditing = () => {
    setIsEditing(true);
  };
  const stopEditingHandler=()=>{
    setIsEditing(false);
  }


  return (
    <Fragment>
      {isEditing && <ExpenseWindow onCancel={stopEditingHandler} onSaveExpenseData={saveExpenseDataHandler}      id={props.id}
          title={props.title}
          amount={props.amount}
          date={props.date} />
          }

    <li >
      <div >
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description" onClick={startEditing}>
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div> 
      <button onClick={deleteExpenseDataHandler} className="expense-item__close"/>
    </Card>
   
    </div>
  
    </li>
    </Fragment>
  );
};
export default ExpenseItem;
