const createNewBudget = (newBudget) => {
    return {
        type: 'CREATE_NEW_BUDGET',
        newBudget: newBudget
    }
}

export default createNewBudget;