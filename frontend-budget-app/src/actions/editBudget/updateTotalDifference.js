const updateTotalDifference = (totalDifference, id) => {
    return {
        type: 'EDIT_BUDGET_UPDATE_TOTAL_DIFFERENCE',
        totalDifference,
        id
    }
}