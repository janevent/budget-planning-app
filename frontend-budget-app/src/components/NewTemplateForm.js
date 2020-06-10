import React from 'react';
import ExpenseInput from './ExpenseInput.js';
import IncomeInput from './IncomeInput.js;'

const NewTemplateForm = () => {
    return (
        <div>
            <form>
                <ExpenseInput/>
            </form>
            <form>
                <IncomeInput/>
            </form>

        </div>
    )
}