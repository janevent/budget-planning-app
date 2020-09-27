const addNewIncome = () => {
    return {
        type: 'EDIT_ADD_NEW_INCOME',
        income: { description: "", amount: 0 }
    }
}

export default addNewIncome