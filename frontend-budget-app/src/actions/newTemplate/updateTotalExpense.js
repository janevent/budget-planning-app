const updateTotalExpense = (totalExpense) => {
    return {
        type: 'UPDATE_TOTAL_EXPENSE',
        totalExpense: totalExpense
    }
}

export default updateTotalExpense;