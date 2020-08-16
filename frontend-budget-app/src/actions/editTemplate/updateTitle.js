const updateTitle = (title, id) => {
    return {
        type: 'UPDATE_TITLE',
        title: title,
        id: id
    }
}

export default updateTitle;