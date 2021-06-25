export default(state = [], action) => {
    let index = state.findIndex( (b) => b.id === action.id);
    console.log('index:', index)
    let firstPart = state.slice(0, index) 
    let lastPart = state.slice( index + 1)
    switch(action.type){
        case 'GET_BUDGETS':
            //return action.included[1].attributes;
            return action.budgets;
        case 'ADD_BUDGET':
            return [...state, action.budget];    
        case 'REMOVE_BUDGET':
            // let index = state.findIndex( (b) => b.id === action.id);
            // console.log('index:', index)
            // let firstPart = state.slice(0, index) 
            // let lastPart = state.slice( index + 1)
            return [...firstPart, ...lastPart];   
        case 'EDIT_BUDGET':
            // let budgetIndex = state.findIndex( (b) => b.id === action.id);
            // let first = state.slice(0, index);
            // let last = state.slice(index+1);
            return [...firstPart, action.budget, ...lastPart];
        case 'EDIT_BUDGET_ADD_NEW_EXPENSE':
            // let budgetI = state.findIndex((b) => b.id === action.budgetId);
            let b = state[index]
            // let fir = state.slice(0, index);
            // let las = state.slice(index+1);
            // let expenseIndex = budgetI.expenses.findIndex(e => e.id === action.expenseId);
            // let firstExpenses = budgetI.expenses.slice(0, index);
            // let lastExpenses = budgetI.expenses.slice(index+1);
            let exs = b.expenses;
            let newExs = [...exs, action.expense];
            let newBudget = {...b, expenses: newExs};
            return [...firstPart, newBudget, ...lastPart]
        case 'EDIT_BUDGET_ADD_NEW_INCOME':
            // let inde = state.findIndex(b => b.id === action.budgetId);
            // let fi = state.slice(0, inde);
            // let la = state.slice(inde+1);
            let bu = state[index];
            let incs = bu.incomes;
            let newIncomes = [...incs, action.income];
            let newBu = {...bu, incomes: newIncomes}
            return [...firstPart, newBu, ...lastPart]
        case 'EDIT_BUDGET_UPDATE_EXPENSE':
            // let ind = state.findIndex(b => b.id === action.budgetId);
            // let f = state.slice(0, ind);
            // let l = state.slice(ind+1);
            let budge = state[index];
            let expenseIndex = budge.expenses.findIndex(e => e.id === action.expenseId);
            let firstExpenses = budge.expenses.slice(0, expenseIndex);
            let lastExpenses = budge.expenses.slice(expenseIndex+1);
            let newExpenses = [...firstExpenses, action.expense, ...lastExpenses];
            let newB = {...b, expenses: newExpenses};
            return [...firstPart, newB, ...lastPart]
        case 'EDIT_BUDGET_UPDATE_INCOME':
            // let i = state.findIndex(b => b.id === action.budgetId);
            // let fP = state.slice(0, i);
            // let lP = state.slice(i+1);
            let oB = state[index];
            let expenseI = oB.expenses.findIndex(e => e.id === action.expenseId);
            let fExpenses = oB.expenses.slice(0, expenseI);
            let lExpenses = oB.expenses.slice(expenseI+1);
            let nExpenses = [...fExpenses, action.expense, ...lExpenses];
            let nB = {...oB, expenses: nExpenses};
            return [...firstPart, nB, ...lastPart]
        default: 
            return state
    }
}

