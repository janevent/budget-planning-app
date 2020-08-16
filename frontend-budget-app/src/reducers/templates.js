export default (state =  [], action) => {
    switch(action.type){
        case 'GET_TEMPLATES':
            //what if there are no templates?
            return action.templates
        case 'ADD_TEMPLATE':
            return [...state, action.template];
        case 'REMOVE_TEMPLATE':
            let index = state.findIndex( (t) => t.id === action.id)
            let firstPart = state.slice(0, index);
            let lastPart = state.slice(index+1);
            return [...firstPart, ...lastPart]
        case 'EDIT_TEMPLATE':
            //do I need this if I have been updated throughout
            let i = state.findIndex( (template) => template.id === action.id);
            let template = state.template;
            let first = state.slice(0, i);
            let last = state.slice( i+1);
            return [...first, template, ...last]
//different action types for edits then create new ones
        case 'UPDATE_TITLE':
            let id = action.id;
            let template1 = state.find( (template) => {
                return template.id === id
            });
            let template1Index = state.findIndex( (template) => template.id === id
            )
            let templateWTitleUpdate = Object.assign( {}, template1, {title: action.title});
            let firstTemplates = state.slice(0, template1Index);
            let lastTemplates = state.slice(template1Index+1);
            let newTemplates = [...firstTemplates, templateWTitleUpdate, ...lastTemplates];       
            return newTemplates;
            
        case 'UPDATE_INCOME':
            //helper methods?
            console.log('action:', action)
            let templateToUpdateIncome = state.find( (template) => {
                return template.id === action.templateId
            });
            let indexOfTemplate = state.findIndex( (template) => {
                return template.id === action.templateId
            })
            let firstPartTemplates = state.slice(0, indexOfTemplate);
            let lastPartTemplates = state.slice( indexOfTemplate+1)
            let indexOfIncome = templateToUpdateIncome.incomes.findIndex( (income) => {
                return income.id === action.incomdId
            });
            let firstPartIncomes = templateToUpdateIncome.incomes.slice(0, indexOfIncome);
            let lastPartIncomes = templateToUpdateIncome.incomes.slice(indexOfIncome + 1);
            let updatedIncomes = [...firstPartIncomes, action.income, ...lastPartIncomes];
            let templateWUpdatedIncome = {...templateToUpdateIncome, ...{incomes: updatedIncomes} } ;
            let updatedTemplates = [...firstPartTemplates, templateWUpdatedIncome, ...lastPartTemplates];
            console.log('updatedTemplates:', updatedTemplates)
            return updatedTemplates;
            
        default:
            return state
    }
}