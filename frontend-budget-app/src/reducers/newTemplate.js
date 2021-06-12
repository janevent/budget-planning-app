export default (state=null, action) => {
        switch(action.type){
            
            case 'UPDATE_TITLE':
                return Object.assign({}, state, {title: action.title} )
                //action.title
            case 'CREATE_NEW_INCOME':
                let is = [...state.incomes, {description: "", amount: "0"}];
                return { ...state, incomes: is}
            case 'UPDATE_INCOME':
               // let i = state.incomes.find((inc, index)=> index === action.id)
                let firstPart = state.incomes.slice(0, action.id)
                let lastPart = state.incomes.slice(action.id + 1)
                let incomes = [...firstPart, action.income, ...lastPart]
                return {...state, incomes: incomes}
            case 'UPDATE_TOTAL_INCOME':
                 return Object.assign({}, state, { totalIncome: action.totalIncome } )
            case 'CREATE_NEW_EXPENSE':
                let es = [...state.expenses, {description: "", amount: "0"}];
                
                return { ...state, expenses: es}
            case 'UPDATE_EXPENSE':
                //let e = state.expenses.find((expense, index)=> index === action.id)
                //debugger
                //pass the whole expense object through and replace at the specific index
                //let e2 = Object.assign( {}, e, {[action.name]:action.expense} )
                
                let e2 = action.expense;
                //debugger
                let expenses
                let firstP;
                let lastP;
                if(action.id > 0 && action.id !== state.expenses.length){
                    firstP = state.expenses.slice(0, action.id)
                    lastP = state.expenses.slice(action.id + 1)
                    expenses = [...firstP, e2, ...lastP]
                    
                }else if(action.id > 0){
                    firstP = state.expenses.slice(0, action.id);
                    expenses = [...firstP, e2];
                }else if(action.id !== state.expenses.length){
                    lastP = state.expenses.slice(action.id +1);
                    expenses = [e2, ...lastP]
                }else {
                    expenses = [ e2]
                }
                return {...state, expenses: expenses}
            case 'UPDATE_TOTAL_EXPENSE':
                return Object.assign({}, state, {totalExpenditure: action.totalExpense} )  
            case 'UPDATE_TOTAL_DIFFERENCE':
                return Object.assign({}, state, {totalDifference: action.totalDifference} ) 
            case 'SET_NEW_TEMPLATE_ID':
                return { ...state, ...{ id: action.id }}
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
                    return {
                    title: "untitled",
                    expenses: [{description: "", amount: "0"}],
                    incomes: [{description: "", amount: "0"}],
                    totalIncome: null,
                    totalExpenditure: null,
                    totalDifference: null
                    }
        }
}