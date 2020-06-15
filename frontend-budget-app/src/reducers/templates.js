export default (state =  null, action) => {
    switch(action.type){
        case 'GET_TEMPLATES':
            //what if there are no templates?
            //return action.user.included[1].attributes
            return action.templates
        default:
            return state
    }
}