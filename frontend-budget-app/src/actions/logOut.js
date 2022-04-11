const logOutUser = () => {
    return {
        type: 'LOG_OUT_USER'
        
    }
}

const clearBudgets = () => {
    return {
        type: 'CLEAR_BUDGETS'
    }
}

const clearTemplates = () => {
    return {
        type: 'CLEAR_TEMPLATES'
    }
}

const fetchLogOutUser = () => {
    return (dispatch) => {
        fetch('https://easy-budgety.herokuapp.com/logout', {
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then( r => r.json())
        .then(myjson => {
            console.log("logout", myjson);
            dispatch(logOutUser());
            dispatch(clearTemplates())
            dispatch(clearBudgets())
        })
    }

}

export default fetchLogOutUser;
