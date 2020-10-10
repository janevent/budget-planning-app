const editTemplate = (template, id) => {
    return {
        type: 'EDIT_TEMPLATE',
        template: template,
        id: id
    }
}

const fetchEditTemplate = (template, id) => {
    return (
        (dispatch) => {
            let filteredIncomes = template.incomes( (income) => {
                return income.attributes.description !== ""
            });
            
            let filteredExpenses = template.expenses( (expense) => {
                return expense.attributes.description !== ""
            });
            let newTemplate = Object.assign( {}, template, {incomes: filteredIncomes, expenses: filteredExpenses})
            fetch(`http://3001:localhost/templates/${id}`, {
                method: 'PUT',    
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(newTemplate)
            })
            .then(resp => resp.json())
            .then( json => {
                console.log('response:', json)
                dispatch(editTemplate(newTemplate, id))
            })
            .catch(error => error.log)
        }
    )

}

export default fetchEditTemplate;