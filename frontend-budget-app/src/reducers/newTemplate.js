export default (state=null, action) => {
        switch(action.type){
            case 'CREATE_NEW_TEMPLATE':
                return {
                    title: "untitled",
                    expenses: [{description: "", amount: "0"}],
                    incomes: [{description: "", amount: "0"}],
                    totalIncome: null,
                    totalExpenditure: null,
                    totalDifference: null
                };
            case 'UPDATE_TITLE':
                return Object.assign({}, state, action.newTemplate.title)
                //action.title
            case 'CREATE_NEW_INCOME':
                let is = [...state.incomes, {description: "", amount: "0"}];
                return { ...state, incomes: is}
            case 'UPDATE_INCOME':
                let i = state.incomes.find((inc, index)=> index === action.id)
                let firstPart = state.incomes.splice(0, action.id)
                let lastPart = state.incomes.splice(action.id + 1)
                let incomes = [...firstPart, action.income, lastPart]
                return {...state, incomes: incomes}
            case 'UPDATE_TOTAL_INCOME':
                 return Object.assign({}, state, action.totalIncome)
            case 'CREATE_NEW_EXPENSE':
                let es = [...state.expenses, {description: "", amount: "0"}];
                return { ...state, expenses: es}
            case 'UPDATE_EXPENSE':
                let e = state.expenses.find((inc, index)=> index === action.id)
                let firstP = state.expenses.splice(0, action.id)
                let lastP = state.expenses.splice(action.id + 1)
                let expenses = [...firstP, action.expense, lastP]
                return {...state, expenses: expenses}
            case 'UPDATE_TOTAL_EXPENSE':
                return Object.assign({}, state, action.totalExpense)  
            case 'UPDATE_TOTAL_DIFFERENCE':
                return Object.assign({}, state, action.totalDifference) 
            case 'CLEAR_NEW_TEMPLATE':
                return {
                    title: "untitled",
                    expenses: [{description: "", amount: "0"}],
                    incomes: [{description: "", amount: "0"}],
                    totalIncome: null,
                    totalExpenditure: null,
                    totalDifference: null
                };
            default:
                return state
        }
}