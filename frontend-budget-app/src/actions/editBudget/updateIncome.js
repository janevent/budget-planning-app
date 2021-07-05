const updateIncome = (budget, expenseId, budgetId) => {
    return {
        type: 'EDIT_BUDGET_UPDATE_INCOME',
        budget: budget,
        expenseId: expenseId,
        id: budgetId
    }
}

export default updateIncome;