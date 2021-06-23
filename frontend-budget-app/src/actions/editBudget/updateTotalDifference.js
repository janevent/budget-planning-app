const updateTotalDifference = (totalDifference, id) => {
    return {
        action: 'EDIT_BUDGET_UPDATE_TOTAL_DIFFERENCE',
        totalDifference,
        id
    }
}