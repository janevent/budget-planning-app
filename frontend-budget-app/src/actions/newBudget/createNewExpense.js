const createNewExpense = (expense) => {
    return {
        type: 'CREATE_NEW_EXPENSE',
        expense: expense
    }
}

export default createNewExpense;