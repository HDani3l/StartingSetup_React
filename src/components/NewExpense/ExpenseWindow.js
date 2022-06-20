import React from "react";
import ReactDOM from "react-dom";

import classes from './ExpenseWindow.module.css';

import ExpenseForm from "./ExpenseForm";
import ModalCard from "../UI/ModalCard";


const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ExpenseWindow = (props) => {


  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalCard className={classes.modal}>
          <header className={classes.header}>
            <h2>Form Of Expense</h2>
          </header> 
          <ExpenseForm 
            onCancel={props.onCancel}
            onSaveExpenseData={props.onSaveExpenseData}
            id={props.id}
            title={props.title}
            amount={props.amount}
            date={props.date}
          />
            <footer className={classes.footer}>
            &nbsp;
          </footer> 
        </ModalCard>,

        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ExpenseWindow;
