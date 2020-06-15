export default(state = null, action) => {
    switch(action.type){
        case 'GET_TEMPLATE':
            return action.template
        default:
            return state;
    }
}