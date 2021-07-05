const addNewExpense = (budgetId) => {
    return {
        type: 'EDIT_BUDGET_ADD_NEW_EXPENSE',
        expense: { type: "expense", attributes: 
        { description: "", amount: 0 } },
        id: budgetId
    }
}

export default addNewExpense