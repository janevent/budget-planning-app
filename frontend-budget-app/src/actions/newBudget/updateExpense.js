const updateExpense = (expense, id) => {
    return {
        type: 'UPDATE_EXPENSE',
        expense: expense,
        id: id
    }
}

export default updateExpense;