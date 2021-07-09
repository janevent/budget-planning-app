const updateIncome = (income, incomeId, budgetId) => {
    return {
        type: 'EDIT_BUDGET_UPDATE_INCOME',
        income,
        incomeId: incomeId,
        id: budgetId
    }
}

export default updateIncome;