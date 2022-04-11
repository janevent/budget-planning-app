export default(state = [], action) => {
    let index = state.findIndex( (b) => b.id === action.id);   
    let firstPart = state.slice(0, index) 
    let lastPart = state.slice( index + 1)
    switch(action.type){
        case 'GET_BUDGETS':
            return action.budgets;
        case 'ADD_BUDGET':
            return [...state, action.budget];    
        case 'REMOVE_BUDGET':
            return [...firstPart, ...lastPart];   
        case 'EDIT_BUDGET':
            return [...firstPart, action.budget, ...lastPart];
        case 'EDIT_BUDGET_ADD_NEW_EXPENSE':            
            let b = state[index]
            let exs = b.expenses;
            let newExs = [...exs, action.expense];
            let newBudget = {...b, expenses: newExs};
            return [...firstPart, newBudget, ...lastPart]
        case 'EDIT_BUDGET_UPDATE_TITLE':
            let budgetToEdit = state[index]
            let editedBudget = {...budgetToEdit, ...{ title: action.title}}
            return [ ...firstPart, editedBudget, ...lastPart]
        case 'EDIT_BUDGET_ADD_NEW_INCOME':
            let bu = state[index];
            let incs = bu.incomes;
            let newIncomes = [...incs, action.income];
            let newBu = {...bu, incomes: newIncomes}
            return [...firstPart, newBu, ...lastPart]
        case 'EDIT_BUDGET_UPDATE_EXPENSE':
            let budge = state[index];
            let expenseId = action.expenseId
            let firstExpenses = budge.expenses.slice(0, expenseId);
            let lastExpenses = budge.expenses.slice(expenseId+1);
            let newExpenses = [...firstExpenses, action.expense, ...lastExpenses];
            let newB = {...budge, expenses: newExpenses};
            return [...firstPart, newB, ...lastPart]
        case 'EDIT_BUDGET_UPDATE_INCOME':
            let oB = state[index];
            let incomeI = action.incomeId
            let fIncomes = oB.incomes.slice(0, incomeI);
            let lIncomes = oB.incomes.slice(incomeI+1);
            let nIncomes = [...fIncomes, action.income, ...lIncomes];
            let nB = {...oB, incomes: nIncomes};
            console.log('nB', nB)
            return [...firstPart, nB, ...lastPart];
        case 'EDIT_BUDGET_UPDATE_TOTAL_DIFFERENCE':
            let bud = state[index];
            let newBud = {...bud, totalDifference: action.totalDifference};
            return [...firstPart, newBud, ...lastPart]
        case 'EDIT_BUDGET_UPDATE_TOTAL_DIFFERENCE':
            let budg = state[index];
            let newBudg = {...budg, totalDifference: action.totalDifference};
            return [...firstPart, newBudg, ...lastPart]
        case 'EDIT_BUDGET_UPDATE_TOTAL_EXPENDITURE':
            let savedBudget = state[index];
            let currentBudget = {...savedBudget, totalExpenditure: action.totalExpenditure};
            return [...firstPart, currentBudget, ...lastPart];
        case 'EDIT_BUDGET_UPDATE_TOTAL_INCOMES':
            let savBudget = state[index];
            let currBudget = {...savBudget, totalIncomes: action.totalIncomes};
            return [...firstPart, currBudget, ...lastPart]
        case 'CLEAR_BUDGETS':
            return []
        default: 
            return state
    }
}

