const createNewIncome = (income) => {
    return {
        type: 'CREATE_NEW_INCOME',
        income: income
    }
} 

export default createNewIncome;