const updateTotalExpenditure = (templateId, totalExpenditure) => {
    return {
        type: 'EDIT_TEMPLATE_AND_UPDATE_TOTAL_EXPENDITURE',
        templateId,
        totalExpenditure
    }
}

export default updateTotalExpenditure;