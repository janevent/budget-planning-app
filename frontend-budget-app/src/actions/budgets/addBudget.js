const addBudget = (budget) => {
    return {
        type: 'ADD_BUDGET',
        budget
    }
}

const fetchAndAddBudget = (budget) => {
    return (dispatch) => {
        console.log('budget:', budget)
        fetch(('http://localhost:3001/budgets'),{
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                budget: budget
            })
        })
        .then(response => response.json())
        .then(
            myjson => {
                if(myjson.error){
                    console.log(myjson.error)
                }else {
                    console.log("mybudgetjson:", myjson)
                    //this.props.setNewBudgetID(myjson.data.id);
                    let budge = myjson.data.attributes;
                    budge.id = myjson.data.id;
                    let expenses = myjson.included.filter( (i) => i.type === 'expense');
                    let incomes = myjson.included.filter( (i) => i.type === 'income');
                    budge.incomes = incomes;
                    budge.expenses = expenses;

                    dispatch(addBudget(budge))                    
                }
            }
        )
        .catch(console.log)
    }
}

export default fetchAndAddBudget;