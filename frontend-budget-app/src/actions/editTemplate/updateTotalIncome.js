const updateTotalIncome = (templateId, total_incomes) => {
    return {
        type: 'EDIT_TEMPLATE_AND_UPDATE_TOTAL_INCOMES',
        templateId,
        total_incomes        
    }
}

export default updateTotalIncome