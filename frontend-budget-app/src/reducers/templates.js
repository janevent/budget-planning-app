export default (state =  [], action) => {
    switch(action.type){
        case 'GET_TEMPLATES':
            console.log('state', state)
            console.log('templates:', action.templates);
            return action.templates
        case 'ADD_TEMPLATE':
            console.log('state', state)
            return [...state, action.template];
        case 'REMOVE_TEMPLATE':
            console.log('state', state)
            let index = state.findIndex( (t) => t.id === action.id)
            let firstPart = state.slice(0, index);
            let lastPart = state.slice(index+1);
            return [...firstPart, ...lastPart]
        case 'EDIT_TEMPLATE':
            console.log('state', state)
            let i = state.findIndex( (template) => template.id === action.id);
            //?
            console.log('id', i)
            let template = action.template;
            let first = state.slice(0, i);
            let last = state.slice( i+1);
            return [...first, template, ...last]
        case 'EDIT_TEMPLATE_AND_UPDATE_TITLE':
            console.log('state', state)
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
            
        case 'EDIT_TEMPLATE_AND_UPDATE_EXPENSE':
            console.log('state', state)
            let templateToUpdateExpense = state.find( (template) => {
                return template.id === action.templateId
            });
            let indexOfT = state.findIndex( (template) => {
                return template.id === action.templateId
            })
            let firstPartTs = state.slice(0, indexOfT);
            let lastPartTs = state.slice( indexOfT+1);
            let indexOfExpense = action.expenseId
            //let indexOfExpense = templateToUpdateExpense.expenses.findIndex( (expense) => {
              //  return expense.id === action.expenseId
            //});
            let firstPartExpenses = templateToUpdateExpense.expenses.slice(0, indexOfExpense);
            let lastPartExpenses = templateToUpdateExpense.expenses.slice(indexOfExpense + 1);
            let updatedExpenses = [...firstPartExpenses, action.expense, ...lastPartExpenses];
            let templateWUpdatedExpense = {...templateToUpdateExpense, ...{expenses: updatedExpenses} } ;
            let updatedTs = [...firstPartTs, templateWUpdatedExpense, ...lastPartTs];
            return updatedTs;   
        case 'EDIT_TEMPLATE_AND_UPDATE_INCOME':  
        console.log('state', state)
            let templateToUpdateIncome = state.find( (template) => {
                return template.id === action.templateId
            });
            let indexOfTemplate = state.findIndex( (template) => {
                return template.id === action.templateId
            })
            let firstPartTemplates = state.slice(0, indexOfTemplate);
            let lastPartTemplates = state.slice( indexOfTemplate+1)
            //let indexOfIncome = templateToUpdateIncome.incomes.findIndex( (income) => {
              //  return income.id === action.incomeId
            //});
            let indexOfIncome = action.incomeId
            let firstPartIncomes = templateToUpdateIncome.incomes.slice(0, indexOfIncome);
            let lastPartIncomes = templateToUpdateIncome.incomes.slice(indexOfIncome + 1);
            let updatedIncomes = [...firstPartIncomes, action.income, ...lastPartIncomes];
            let templateWUpdatedIncome = {...templateToUpdateIncome, ...{incomes: updatedIncomes} } ;
            let updatedTemplates = [...firstPartTemplates, templateWUpdatedIncome, ...lastPartTemplates];
            return updatedTemplates;   
        case 'EDIT_TEMPLATE_AND_UPDATE_TOTAL_EXPENDITURE':
            console.log('state', state)
            let tETemplate = state.find((template) => template.id === action.templateId );
            let tETemplateIndex = state.findIndex( (template) => template.id === action.templateId);
            let tEfirstPartTemplates = state.slice( 0, tETemplateIndex);
            let tELastPartTemplates = state.slice( tETemplateIndex+1)
            let updatedTotalExpenditure = action.totalExpenditure;
            let updatedTETemplate = { ...tETemplate, ...{total_expenditure: updatedTotalExpenditure}};
            let updatedTETemplates = [...tEfirstPartTemplates, updatedTETemplate, ...tELastPartTemplates]
            return updatedTETemplates;  
        case 'EDIT_TEMPLATE_AND_UPDATE_TOTAL_INCOMES':
            console.log('state', state)
            let editTemplate = state.find((template) => template.id === action.templateId );
            let editTemplateIndex = state.findIndex((template) => template.id === action.templateId);
            let editFirstPartTemplates = state.slice( 0, editTemplateIndex);
            let editLastPartTemplates = state.slice( editTemplateIndex+1);
            let updatedTotalIncomes = action.total_incomes;
            let updatedEditTemplate = {...editTemplate, ...{total_income: updatedTotalIncomes}};
            let updatedEditTemplates = [...editFirstPartTemplates, updatedEditTemplate, ...editLastPartTemplates];
            //console.log("updateTI in reducer", updatedEditTemplates)
            return updatedEditTemplates; 
        case 'EDIT_TEMPLATE_UPDATE_TOTAL_DIF':
            console.log('state', state)
            let eT = state.find((t) => t.id === action.templateId);
            let eTIndex = state.findIndex( (t) => t.id === action.templateId);
            let copyEt = {...eT, ...{total_difference: action.totalDifference}};
            let fTs = state.slice(0, eTIndex);
            let lTs = state.slice(eTIndex+1);
            return [...fTs, copyEt, ...lTs];
            
        case 'EDIT_ADD_NEW_INCOME':
            console.log(action, "state", state)
            //debugger
            if(state.length > 0){
                console.log("state", state, "action:", action)
            let templateToAddTo = state.find((template) => template.id === action.templateId);
            let ind = state.findIndex((template) => template.id === action.templateId);
            let templateIncomes = templateToAddTo.incomes
            let mergedIncomes = [...templateIncomes, action.income];
            console.log("mergedIncomes:", mergedIncomes)
            let mergedWithTemplate = {...templateToAddTo, ...{incomes: mergedIncomes}};
            let firstP = state.slice(0, ind)
            let lastP = state.slice( ind+1)
            let mergedTemplates = [...firstP, mergedWithTemplate, ...lastP]
            return mergedTemplates}
            else{
                console.log("else state:", state)
                return state
            }
        case 'EDIT_ADD_NEW_EXPENSE':
            console.log('state', state)
            let tempToAddTo = state.find((template) => template.id === action.templateId);
            let inde= state.findIndex((template) => template.id === action.templateId);
            let tempExpenses = tempToAddTo.expenses
            let mergExpenses = [...tempExpenses, action.expense];
            console.log("mergedIncomes:", mergExpenses)
            let mergedWithTemp = {...tempToAddTo, ...{expenses: mergExpenses}};
            let f = state.slice(0, inde)
            let l = state.slice( inde+1)
            let mergedTemps = [...f, mergedWithTemp, ...l]
            return mergedTemps

        default:
            
            return state
    }
}