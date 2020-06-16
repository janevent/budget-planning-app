const getTemplates = (templates) => {
    return {
        type: 'GET_TEMPLATES',
        templates: templates
    }
}

export default getTemplates;