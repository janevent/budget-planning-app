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
            return [...first, action.budget, ...last]
        default: 
            return state
    }
}

