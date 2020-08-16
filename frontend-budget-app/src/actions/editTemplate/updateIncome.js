const updateIncome = (income, incomeId, templateId ) => {
    return {
        type: 'UPDATE_INCOME',
        income: income,
        incomeId: incomeId,
        templateId: templateId
    }
}

export default updateIncome;