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
        case 'EDIT_TEMPLATE':
            let i = state.findIndex( (template) => template.id === action.id);
            let template = state.template;
            //?
            let first = state.slice(0, i);
            let last = state.slice( i+1);
            return [...first, template, ...last]
//different action types for edits then create new ones
        case 'UPDATE_TITLE':
            let id = action.id;
            let template = state.find( (template) => {
                return template.id === id
            });
            let templateWTitleUpdate = Object.assign( {}, template, action.title);
            return templateWTitleUpdate;
        case 'UPDATE_INCOME':
        default:
            return state
    }
}