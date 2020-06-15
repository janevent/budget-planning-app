const getBudget = (budget) => {
    return {
        type: 'GET_BUDGET',
        budget: budget
    }
}

export default getBudget;