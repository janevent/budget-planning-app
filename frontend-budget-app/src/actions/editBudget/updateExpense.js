const updateExpense = (budget, expenseId, budgetId) => {
    return {
        type: 'EDIT_BUDGET_UPDATE_EXPENSE',
        budget: budget,
        expenseId,
        id: budgetId
    }
}

export default updateExpense;