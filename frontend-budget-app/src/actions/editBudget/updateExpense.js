const updateExpense = (budget, expenseId, budgetId) => {
    return {
        action: 'EDIT_BUDGET_UPDATE_EXPENSE',
        budget: budget,
        expenseId,
        budgetId
    }
}

export default updateExpense;