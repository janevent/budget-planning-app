import React from 'react';

const IncomeInput = (props) => {
    return (
        <div className="IncomeInput">
            <label className="label">Description <input type="text" name="description" value={props.income.description} onChange={ (event) => props.handleIncomeChange(event, props.id)} onClick={props.handleIncomeMouseClick} />
            </label>
            <label className="label">Amount $<input type="text" name="amount" value={props.income.amount} onChange={ (event) => props.handleIncomeChange(event, props.id)} />
            </label>
        </div>
    )
}

export default IncomeInput;