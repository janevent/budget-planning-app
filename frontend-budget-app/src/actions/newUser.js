const newCurrentUser = (user) => {
    return {
        type: "CREATE_CURRENT_USER",
        user: user
    };
};

export default newCurrentUser;