import React from 'react';

const ExpenseInput = (props) => {
    return (       
        <div className="ExpenseInput" key={props.id}>
            <label className="label">Description <input type="text" className="input"value={props.expense.description} name="description" onChange={(event) => props.handleChange(event, props.id)} onClick={props.handleExpenseMouseClick} placeholder="description"/></label>
            <label className="label">Amount $<input type="text" className="input" name="amount" value={props.expense.amount} onChange={(event) => props.handleChange(event, props.id) } placeholder="0" /></label>
        </div>
    )
}

export default ExpenseInput;