export default (dispatch)=>(action)=>{
    console.log("thunk")
    if(typeof action === "function"){
        return action(dispatch)
    }
    dispatch(action)       
}