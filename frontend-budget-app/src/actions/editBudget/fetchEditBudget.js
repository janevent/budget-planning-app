const editBudget = (budget, id) => {
    return {
        action: 'EDIT_BUDGET',
        budget,
        id
    }
}

const fetchEditBudget = (budget, id) => {
    return (
    (dispatch) => {
        console.log('reached fetchEditBudget');
        console.log('budget', budget, 'id', id)
        console.log("type", typeof id);
        
        fetch(`http://localhost:3001/budgetss/${id}`, {               
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
                let budget = myjson.data.attributes;
                budget.id = myjson.data.id;
                let expenses = myjson.included.filter( (i) => i.type === 'expense');
                let incomes = myjson.included.filter( (i) => i.type === 'income');
                tem.incomes = incomes;
                tem.expenses = expenses;
                dispatch(editBudget(tem, id))
            }
        })
        .catch(error => console.log(error))
    }
    )
}

export default fetchEditBudget