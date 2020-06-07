export default ( state = null, action) => {
    //debugger
    switch(action.type){
        case "SET_CURRENT_USER":
            //debugger
            //console.log(action)
            return action.user
        case "CREATE_CURRENT_USER":
            console.log("action:", action)
            return action.user
        default:
            return state
    }
}