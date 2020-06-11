import React from 'react';

const ExpenseInput = (props) => {
    return (
        
        <div className="ExpenseInput">
            {console.log("id: ", props.id, "key: ")}

            <label>Description <input type="text" value={props.expense.description} name="description" onChange={(event) => props.handleChange(event, props.id)} onClick={props.handleExpenseMouseClick} /></label>

            <label>Amount $<input type="text" name="amount" onChange={(event) => props.handleChange(event, props.id) }  /></label>
        </div>
    )
}

//onChange={(event) => props.handleChange(event. props.id)}

export default ExpenseInput;