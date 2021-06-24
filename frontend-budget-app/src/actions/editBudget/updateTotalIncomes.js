const updateTotalIncomes = (totalIncomes, id) => {
    return {
        action: 'EDIT_BUDGET_UPDATE_TOTAL_INCOMES',
        totalIncomes,
        id
    }
}

export default updateTotalIncomes;