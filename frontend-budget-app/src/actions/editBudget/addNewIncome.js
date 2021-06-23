const addNewIncome = (budgetId) => {
    return {
        type: 'EDIT__BUDGET_ADD_NEW_INCOME',
        income: { type: "income", attributes: {description: "", amount: 0 } },
        budgetId: budgetId
    }
}

export default addNewIncome