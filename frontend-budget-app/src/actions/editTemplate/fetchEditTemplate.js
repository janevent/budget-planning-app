const editTemplate = (template, id) => {
    return {
        type: 'EDIT_TEMPLATE',
        template: template,
        id: id
    }
}

const fetchEditTemplate = (template, id) => {
    return (
        (dispatch) => {
            fetch(`http://3001:localhost/templates/${id}`, {
                method: 'PUT',    
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(template)
            })
            .then(resp => resp.json())
            .then( json => {
                console.log('response:', json)
                dispatch(editTemplate(template, id))
            })
        }
    )

}

export default fetchEditTemplate;