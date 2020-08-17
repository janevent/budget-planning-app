const updateExpense = (expense, expenseId, templateId) => {
    return {
        type: 'UPDATE_EXPENSE',
        expense: expense,
        expenseId: expenseId,
        templateId: templateId
    }
}

export default updateExpense;