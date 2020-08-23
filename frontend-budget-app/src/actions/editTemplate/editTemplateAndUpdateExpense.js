const editTemplateAndUpdateExpense = (expense, expenseId, templateId) => {
    return {
        type: 'EDIT_TEMPLATE_AND_UPDATE_EXPENSE',
        expense: expense,
        expenseId: expenseId,
        templateId: templateId
    }
}

export default editTemplateAndUpdateExpense;