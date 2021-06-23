const addNewExpense = (budgetId) => {
    return {
        type: 'EDIT__BUDGET_ADD_NEW_EXPENSE',
        expense: { type: "expense", attributes: 
        { description: "", amount: 0 } },
        budgetId: budgetId
    }
}

export default addNewExpense