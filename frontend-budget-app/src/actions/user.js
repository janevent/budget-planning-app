export default setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER",
        user: user
    }
}