const updateTotalExpenditure = (totalExpenditure, id) => {
    return {
        type: 'EDIT_BUDGET_TOTAL_EXPENDITURE',
        totalExpenditure,
        id
    }
}

export default updateTotalExpenditure;