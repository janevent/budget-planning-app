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
            console.log('reached fetchEditTemplate');
            console.log('template', template, 'id', id)
            console.log("type", typeof id);
            // console.log("template", template)
            // debugger
            // let filteredIncomes = template.incomes.filter( (income) => {
            //     return income.attributes.description !== ""
            // });
            
            // let filteredExpenses = template.expenses.filter( (expense) => {
            //     return expense.attributes.description !== ""
            // });
            // let newTemplate = Object.assign( {}, template, {incomes: filteredIncomes, expenses: filteredExpenses})
            fetch(`https://easy-budgety.herokuapp.com/templates/${id}`, {               
                credentials: 'include',
                method:'put',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    template: template })
            })
            .then(resp => resp.json())
            .then( myjson => {
                if(myjson.error){
                    console.log(myjson.error)
                }else {
                    console.log('response:', myjson)
                    //what type does totals come back as
                    let tem = myjson.data.attributes;
                    tem.id = myjson.data.id;
                    let expenses = myjson.included.filter( (i) => i.type === 'expense');
                    let incomes = myjson.included.filter( (i) => i.type === 'income');
                    tem.incomes = incomes;
                    tem.expenses = expenses;
                    dispatch(editTemplate(tem, id))
                }
            })
            .catch(error => console.log(error))
        }
    )

}

export default fetchEditTemplate;