export default ( state = null, action) => {
    //debugger
    switch(action.type){
        case "SET_CURRENT_USER":
            //debugger
            //console.log(action)
            return action.user
        case "CREATE_CURRENT_USER":
            console.log("action:", action)
            return action.user.data.attributes
        case "GET_CURRENT_USER":
            console.log("action:", action)
            console.log("user:", action.user)
            return action.user.data.attributes
        case "LOG_OUT_USER":
            //debugger
            return null
            
        default:
            return state
    }
}