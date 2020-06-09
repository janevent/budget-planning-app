const getCurrentUser = (user) => {
    return {
        
        type: "GET_CURRENT_USER",
        user: user
    };
};

export default getCurrentUser