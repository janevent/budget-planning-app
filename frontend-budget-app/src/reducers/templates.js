export default (state =  [], action) => {
    switch(action.type){
        case 'GET_TEMPLATES':
            //what if there are no templates?
            //return action.user.included[1].attributes
            console.log("t-action:", action)
            return action.templates
        case 'ADD_TEMPLATE':
            return [...state, action.template];
        default:
            return state
    }
}