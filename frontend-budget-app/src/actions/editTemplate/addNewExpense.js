const addNewExpense = (templateId) => {
    return {
        type: 'EDIT_ADD_NEW_EXPENSE',
        expense: { description: "", amount: 0 },
        templateId: templateId
    }
}

export default addNewExpense