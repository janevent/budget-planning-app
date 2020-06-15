export default( state=null, action) => {
    switch(action.type){
        case 'GET_BUDGET':
            return action.budget;
        default:
            return state
    }
}