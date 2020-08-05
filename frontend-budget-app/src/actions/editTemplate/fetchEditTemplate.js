const editTemplate = (template, id) => {
    return {
        type: 'EDIT_TEMPLATE',
        template: template,
        id: id
    }
}