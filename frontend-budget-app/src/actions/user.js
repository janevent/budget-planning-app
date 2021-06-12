const setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER",
        user: user
    }
}

const getTemplates = (templates) => {
    return {
        type: 'GET_TEMPLATES',
        templates: templates
    }
}

const getBudgets = (budgets) => {
    return {
        type: 'GET_BUDGETS',
        budgets: budgets
    }
}


const fetchSetCurrentUser = (user) => {
    return (dispatch) => {
        fetch('http://localhost:3001/login', {
            credentials: "include",
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
                 Accept: 'application/json'
             },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(myjson => { 
            console.log("object:", myjson); 
            //dispatch action
            if(myjson !== false){
            dispatch(setCurrentUser(myjson.user.data.attributes));
            //this.props.history.push('/');
            //
            let budgies = myjson.budgets.map( (b) => {
                let newb = b.data.attributes;
                newb.id = b.data.id;
                newb.expenses = b.included.filter( e => e.type ==="expense");
                newb.incomes = b.included.filter( i => i.type ==="income");
                return newb
              })
              let tempies = myjson.templates.map( (t) => {
                let newt = t.data.attributes;
                newt.id = t.data.id;
                newt.expenses = t.included.filter( e => e.type === "expense");
                newt.incomes = t.included.filter( i => i.type ==="income");
                return newt
              })
            dispatch(getBudgets(budgies));
            dispatch(getTemplates(tempies));
            }
            //this.props.getTemplates
        })
        .catch(error => console.log(error))
        }
    }

export default fetchSetCurrentUser