export default(state = null, action) => {
    switch(action.type){
        case 'SET_TEMPLATE':
            return action.template
        default:
            return state;
    }
}