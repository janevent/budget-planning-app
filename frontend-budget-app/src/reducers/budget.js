export default( state=null, action) => {
    switch(action.type){
        case 'SET_BUDGET':
            return action.budget;
        default:
            return state
    }
}