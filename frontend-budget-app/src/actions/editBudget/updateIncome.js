const updateIncome = (budget, expenseId, budgetId) => {
    return {
        action: 'EDIT_BUDGET_UPDATE_INCOME',
        budget: budget,
        expenseId: expenseId,
        budgetId: budgetId
    }
}

export default updateIncome;