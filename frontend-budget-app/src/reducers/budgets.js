export default(state = [], action) => {
    switch(action.type){
        case 'GET_BUDGETS':
            //return action.included[1].attributes;
            return action.budgets;
        case 'ADD_BUDGET':
            return [...state, action.budget];            
        default: 
            return state
    }
}

