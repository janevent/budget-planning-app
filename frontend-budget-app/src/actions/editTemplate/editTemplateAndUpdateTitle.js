const editTemplateAndUpdateTitle = (title, id) => {
    return {
        type: 'EDIT_TEMPLATE_AND_UPDATE_TITLE',
        title: title,
        id: id
    }
}

export default editTemplateAndUpdateTitle;