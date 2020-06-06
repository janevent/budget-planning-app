export default createCurrentUser = (user) => {
    return {
        type: "CREATE_CURRENT_USER",
        user: user
    }
}