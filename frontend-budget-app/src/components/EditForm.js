import React from 'react';
import IncomeInput from './IncomeInput';
import ExpenseInput from './ExpenseInput';
import TitleForm from'./TitleForm';



const EditForm = ( { data, type, handleTitleChange, handleIncomeChange, handleExpenseChange })  => {
    
        return(
            
            <div className='EditForm'>
                { data ?
                    <div className='edit-form-wrapper' >
                        <h2 className='edit-form-item'>Edit Your {type} Below</h2>
                        
                        <TitleForm title={data.title} handleTitleChange={handleTitleChange} />
                        <h3>Incomes</h3>
                        <form>
                            {data.incomes.map( (income) => {
                                console.log('income:', income)
                                return <IncomeInput income={income.attributes} handleIncomeChange={handleIncomeChange} key={income.id} id={income.id} />
                            }
                            )}
                        </form>
                        {data.totalIncome ?
                        <p>Total Income: ${data.totalIncome}</p> :
                        ''
                        }
                        <h3>Expenses</h3>
                        <form>
                            { data.expenses.map( (expense) => {
                                return <ExpenseInput expense={expense.attributes} handleChange={handleExpenseChange} key={expense.id} id={expense.id} />
                            })}
                        </form>  
                        {data.totalExpenditure ?
                        <p> Total Expense: ${data.totalExpenditure} </p> :
                        ''
                        }
                        {data.totalDifference ?
                        <p> Total Difference: ${data.totalDifference} </p> :
                        '' 
                        }
                    </div>
                :
                "" }
            </div>   
        )
}

export default EditForm