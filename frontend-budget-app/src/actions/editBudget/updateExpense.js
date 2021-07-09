const updateExpense = (expense, expenseId, budgetId) => {
    return {
        type: 'EDIT_BUDGET_UPDATE_EXPENSE',
        expense,
        expenseId,
        id: budgetId
    }
}

export default updateExpense;