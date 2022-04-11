const updateTitle = (title, id) => {
    console.log('updateTitle', title)
    return {
        type: 'EDIT_BUDGET_UPDATE_TITLE',
        title,
        id
    }
}

export default updateTitle;