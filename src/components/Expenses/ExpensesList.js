import './ExpensesList.css';
import ExpenseItem from './ExpenseItem';
const ExpensesList=(props)=>{
  
    if (props.expenses.length === 0) {
      return <h2 className='expenses-list__fallback'>No Expenses find</h2>;
    }
 
    if (props.error){
      return <h2 className='expenses-list__fallback'>Somthing went wrong</h2>;
    }
    return <ul className='expenses-list'>
       {props.expenses.map((expense) => (
        <ExpenseItem
          onModExpense={props.onModExpense}
          onDeleteExpense={props.onDeleteExpense}
          key={expense.id}
          id={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ul>
};
export default ExpensesList;