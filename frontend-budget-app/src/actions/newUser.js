const newCurrentUser = (user) => {
    return {
        type: "CREATE_CURRENT_USER",
        user: user
    };
};

const fetchNewCurrentUser = (user) => {
    return (dispatch) => {
        fetch('http://localhost:3001/users', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(r => r.json())
        .then((myjson) => {
            console.log("user:", myjson.data.attributes )
            
            dispatch(newCurrentUser(myjson.data.attributes));
        })           
    }
}

export default fetchNewCurrentUser;