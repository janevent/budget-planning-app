const addNewIncome = (budgetId) => {
    return {
        type: 'EDIT_BUDGET_ADD_NEW_INCOME',
        income: { type: "income", attributes: {description: "", amount: 0 } },
        id: budgetId
    }
}

export default addNewIncome