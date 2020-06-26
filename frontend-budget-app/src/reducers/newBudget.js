export default (state=null, action) => {
    switch(action.type){
        case 'CREATE_NEW_BUDGET':
            return action.budget
        case 'SET_NEW_BUDGET_ID':
            return {...state, id: action.id}
        default:
            return state
    }
}