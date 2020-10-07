const addNewIncome = (templateId) => {
    return {
        type: 'EDIT_ADD_NEW_INCOME',
        income: { description: "", amount: 0 },
        templateId: templateId
    }
}

export default addNewIncome