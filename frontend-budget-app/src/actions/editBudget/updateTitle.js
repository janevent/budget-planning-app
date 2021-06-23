const updateTitle = (title, id) => {
    return {
        action: 'EDIT_BUDGET_UPDATE_TITLE',
        title,
        id
    }
}

export default updateTitle;