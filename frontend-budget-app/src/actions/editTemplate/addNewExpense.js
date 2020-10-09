const addNewExpense = (templateId) => {
    return {
        type: 'EDIT_ADD_NEW_EXPENSE',
        expense: { type: "expense", attributes: 
        { description: "", amount: 0 } },
        templateId: templateId
    }
}

export default addNewExpense