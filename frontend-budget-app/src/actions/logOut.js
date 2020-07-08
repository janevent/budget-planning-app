const logOutUser = () => {
    return {
        type: 'LOG_OUT_USER',
        
    }
}

const fetchLogOutUser = () => {
    return (dispatch) => {
        fetch('http://localhost:3001/logout', {
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
        })
    }

}

export default fetchLogOutUser;
