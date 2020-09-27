const addNewExpense = () => {
    return {
        type: 'EDIT_ADD_NEW_EXPENSE',
        expense: { description: "", amount: 0 }
    }
}

export default addNewExpense