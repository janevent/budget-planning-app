const updateExpense = (expense) => {
    return {
        type: 'UPDATE_EXPENSE',
        expense: expense
    }
}

export default updateExpense;