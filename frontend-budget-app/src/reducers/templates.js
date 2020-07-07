export default (state =  [], action) => {
    switch(action.type){
        case 'GET_TEMPLATES':
            //what if there are no templates?
            //return action.user.included[1].attributes
            console.log("t-action:", action)
            return action.templates
        case 'ADD_TEMPLATE':
            return [...state, action.template];
        case 'REMOVE_TEMPLATE':
            let index = state.findIndex( (t) => t.id === action.id)
            let firstPart = state.slice(0, index);
            let lastPart = state.slice(index+1);
            return [...firstPart, ...lastPart]
        default:
            return state
    }
}