import React from 'react';

const IncomeInput = (props) => {
    return (
        <div className="IncomeInput">
            <label>Description <input type="text" name="description" value={props.income.description} handleChange={ (event) => props.handleIncomeChange(event, props.id)} />
            </label>
            <label>Amount <input type="text" name="amount" value={props.incme.amount} handleChange={ (event) => props.handleIncomeChange(event, props.id)}/>
            </label>
        </div>
    )
}

export default IncomeInput;