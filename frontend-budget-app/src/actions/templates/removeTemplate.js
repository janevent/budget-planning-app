const removeTemplate = (id) => {
    return {
        type: 'REMOVE_TEMPLATE',
        id
    }
}

const fetchDeleteTemplate = (id) => {
    console.log(typeof id);
    return (dispatch) => {
        fetch( `http://localhost:3001/templates/${id}`, {
            credentials: 'include',
            method: 'delete'           
        })
        .then( resp => resp.json())
        .then( myjson => {
            if(myjson.error){
                console.error(myjson.error)
            }else {
                console.log('myjson:', myjson)
                //remove from budgets in store
                dispatch(removeTemplate(id))
                //redirect to home
                //this.props.history.push('/')
            }
        })
        .catch(console.log)
    }
}

export default fetchDeleteTemplate