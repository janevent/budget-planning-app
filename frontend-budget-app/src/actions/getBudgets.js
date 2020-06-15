const getBudgets = (budgets) => {
    return {
        type: 'GET_BUDGETS',
        budgets: budgets
    }
}

export default getBudgets;