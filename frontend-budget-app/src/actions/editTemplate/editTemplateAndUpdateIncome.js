const editTemplateAndUpdateIncome = (income, incomeId, templateId ) => {
    return {
        type: 'EDIT_TEMPLATE_AND_UPDATE_INCOME',
        income: income,
        incomeId: incomeId,
        templateId: templateId
    }
}

export default editTemplateAndUpdateIncome;