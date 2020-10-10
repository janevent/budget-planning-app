import React from 'react';
import IncomeInput from './IncomeInput';
import ExpenseInput from './ExpenseInput';
import TitleForm from'./TitleForm';



const EditForm = ( { data, type, handleTitleChange, handleIncomeChange, handleExpenseChange, onClickAddIncome, onClickAddExpense, saveEdit })  => {
    
        return(
            
            <div className='EditForm'>
                { data ?
                   
                    <div className='edit-form-wrapper' >
                        <h2 className='edit-form-item'>Edit Your {type} Below</h2>
                        
                        <TitleForm title={data.title} handleTitleChange={handleTitleChange} />
                        <h3>Incomes</h3>
                        <form>
                            {data.incomes.map( (income) => {
                                //console.log('income', income)
                                return <IncomeInput income={income.attributes} handleIncomeChange={handleIncomeChange} key={income.id} id={income.id} />
                            }
                            )}
                        </form>
                        <br></br>
                        <button id="add-income-input-field" onClick={onClickAddIncome} >Add New Income</button>
                        <br></br>
                        {data.total_income ?
                        <p>Total Income: ${data.total_income}</p> :
                        ''
                        }
                        <h3>Expenses</h3>
                        <form>
                            { data.expenses.map( (expense) => {
                                //console.log('data:', data, 'expenses:', data.expenses, 'expense:', expense)
                                if(expense!==undefined){
                                    return <ExpenseInput expense={expense.attributes} handleChange={handleExpenseChange} key={expense.id} id={expense.id} />
                                }else{
                                    return ''
                                }
                            })}
                        </form>  
                        <br></br>
                        <button id="add-expense-input-field" onClick={onClickAddExpense}>Add Expense Input</button>
                        {data.total_expenditure ?
                        <p> Total Expense: ${data.total_expenditure} </p> :
                        ''
                        }
                        {data.total_difference ?
                        <p> Total Difference: ${data.total_difference} </p> :
                        '' 
                        }
                        <br></br>
                        <button id="save-edit-button" onClick={saveEdit}>Save</button>
                    </div>
                :
                "" }
            </div>   
        )
}

export default EditForm