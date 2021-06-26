const updateTitle = (title, id) => {
    return {
        type: 'EDIT_BUDGET_UPDATE_TITLE',
        title,
        id
    }
}

export default updateTitle;