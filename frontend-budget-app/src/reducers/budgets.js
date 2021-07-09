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
            console.log('newExs', newExs)
            let newBudget = {...b, expenses: newExs};
            return [...firstPart, newBudget, ...lastPart]
        case 'EDIT_BUDGET_ADD_NEW_INCOME':
            // let inde = state.findIndex(b => b.id === action.budgetId);
            // let fi = state.slice(0, inde);
            // let la = state.slice(inde+1);
            let bu = state[index];
            let incs = bu.incomes;
            let newIncomes = [...incs, action.income];
            console.log('newIncomes', newIncomes)
            let newBu = {...bu, incomes: newIncomes}
            return [...firstPart, newBu, ...lastPart]
        case 'EDIT_BUDGET_UPDATE_EXPENSE':
            // let ind = state.findIndex(b => b.id === action.budgetId);
            // let f = state.slice(0, ind);
            // let l = state.slice(ind+1);
            let budge = state[index];
            console.log('b', budge)
            //let expenseIndex = budge.expenses.findIndex(e => e.id === action.expenseId);
            let expenseId = action.expenseId
            let firstExpenses = budge.expenses.slice(0, expenseId);
            let lastExpenses = budge.expenses.slice(expenseId+1);
            let newExpenses = [...firstExpenses, action.expense, ...lastExpenses];
            let newB = {...budge, expenses: newExpenses};
            return [...firstPart, newB, ...lastPart]
        case 'EDIT_BUDGET_UPDATE_INCOME':
            // let i = state.findIndex(b => b.id === action.budgetId);
            // let fP = state.slice(0, i);
            // let lP = state.slice(i+1);
            let oB = state[index];
            console.log('b', oB)
           // let incomeI = oB.incomes.findIndex(e => e.id === action.expenseId);
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
        default: 
            return state
    }
}

