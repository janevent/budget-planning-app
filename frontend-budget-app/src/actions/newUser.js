const newCurrentUser = (user) => {
    return {
        type: "CREATE_CURRENT_USER",
        user: user
    };
};

const fetchNewCurrentUser = (user) => {
    return (dispatch) => {
        fetch('https://easy-budgety.herokuapp.com/users', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',               
            },
            body: JSON.stringify(user)
        })
        .then(r => r.json())
        .then((myjson) => {
            //console.log("user:", myjson.data.attributes )
            console.log("myjson: ", myjson)
            dispatch(newCurrentUser(myjson.data.attributes));
        })           
    }
}

export default fetchNewCurrentUser;