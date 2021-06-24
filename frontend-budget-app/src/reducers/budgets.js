export default(state = [], action) => {
    switch(action.type){
        case 'GET_BUDGETS':
            //return action.included[1].attributes;
            return action.budgets;
        case 'ADD_BUDGET':
            return [...state, action.budget];    
        case 'REMOVE_BUDGET':
            let index = state.findIndex( (b) => b.id === action.id);
            console.log('index:', index)
            let firstPart = state.slice(0, index) 
            let lastPart = state.slice( index + 1)
            return [...firstPart, ...lastPart];   
        case 'EDIT_BUDGET':
            let budgetIndex = state.findIndex( (b) => b.id === action.id);
            let first = state.slice(0, index);
            let last = state.slice(index+1);
            return [...first, action.budget, ...last];
        case 'EDIT_BUDGET_ADD_NEW_EXPENSE':
            let budgetI = state.findIndex((b) => b.id === action.budgetId);
            let b = state[budgetI]
            let fir = state.slice(0, index);
            let las = state.slice(index+1);
            // let expenseIndex = budgetI.expenses.findIndex(e => e.id === action.expenseId);
            // let firstExpenses = budgetI.expenses.slice(0, index);
            // let lastExpenses = budgetI.expenses.slice(index+1);
            let exs = budgetI.expenses;
            let newExs = [...exs, action.expense];
            let newBudget = {...b, expenses: neExs};
            return [...fir, newBudget, ...las]
        case 'EDIT_BUDGET_ADD_NEW_INCOME':
            let inde = state.findIndex(n => b.id === action.budgetId);
            let fi = state.slice(0, index);
            let la = state.slice(index+1);
            let bu = state[inde];
            let incs = bu.incomes;
            let newIncomes = [...incs, action.income];
            let newBu = {...bu, incomes: newIncomes}
            return [...fir, newBu, ...la]


        default: 
            return state
    }
}

