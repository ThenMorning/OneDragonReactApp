import { createStore } from "../../lib/redux";
import reducer from "./reducer";
import thunk from "../../lib/redux-thunk"
let p2 = (dispatch)=>{
    return (action)=>{
        console.log("p2")
        dispatch(action)
    }
}
export default createStore({a:1},reducer,[
    thunk,p2
]);


