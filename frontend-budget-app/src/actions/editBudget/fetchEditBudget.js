const editBudget = (budget, id) => {
    return {
        type: 'EDIT_BUDGET',
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
        
        fetch(`https://easy-budgety.herokuapp.com/budgets/${id}`, {               
            credentials: 'include',
            method:'put',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                budget })
        })
        .then(resp => resp.json())
        .then( myjson => {
            if(myjson.error){
                console.log(myjson.error)
            }else {
                console.log('response:', myjson)
                //what type does totals come back as
                let bud = myjson.data.attributes;
                bud.id = myjson.data.id;
                let expenses = myjson.included.filter( (i) => i.type === 'expense');
                let incomes = myjson.included.filter( (i) => i.type === 'income');
                bud.incomes = incomes;
                bud.expenses = expenses;
                dispatch(editBudget(bud, id))
            }
        })
        .catch(error => console.log(error))
    }
    )
}

export default fetchEditBudget