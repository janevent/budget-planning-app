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
            fetch(`http//:3000:localhost/templates/${id}`, {
                method: 'PUT',
                body: JSON.stringify(template)
            })
            .then(resp => resp.json())
            .then( json => {
                dispatch(editTemplate(template, id))
            })
        }
    )

}

export default fetchEditTemplate;