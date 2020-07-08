const getCurrentUser = (user) => {
    return {
        
        type: "GET_CURRENT_USER",
        user: user
    };
};

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

const fetchCurrentUser = () => {
    return (dispatch) => {        
            fetch('http://localhost:3001/get_current_user', {
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
                }
            })
            .then( r => r.json())
            .then(myjson => {
              if(myjson.error){
                alert(myjson.error)
              }else {
                console.log("myjson:", myjson)
                dispatch(getCurrentUser(myjson.user.data.attributes));
                
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
                dispatch(getTemplates(tempies));
                dispatch(getBudgets(budgies));
              }
            } )
            .catch(console.log)
        }         
    }

    export default fetchCurrentUser;
