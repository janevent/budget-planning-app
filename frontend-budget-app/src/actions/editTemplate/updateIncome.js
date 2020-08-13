const updateIncome = (income, id ) => {
    return {
        type: 'UPDATE_INCOME',
        income: income,
        id: id
    }
}

export default updateIncome;