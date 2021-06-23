const updateTotalExpenditure = (totalExpenditure, id) => {
    return {
        action: 'EDIT_BUDGET_TOTAL_EXPENDITURE',
        totalExpenditure,
        id
    }
}

export default updateTotalExpenditure;