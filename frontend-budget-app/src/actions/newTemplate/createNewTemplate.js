const createNewTemplate = (newTemplate) => {
    return {
        type: 'CREATE_NEW_TEMPLATE',
        newTemplate: newTemplate
    }
}

export default createNewTemplate;