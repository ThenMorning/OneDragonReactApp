import { ACTION_EDIT_A } from "./action";

export default (state, action) => {
    console.log(action)
    switch (action.type) {
      case ACTION_EDIT_A:
        Object.assign(state,Object.assign(state.store,{a:action.payload}))
        break;
      default:
    }
    return state;
  };
  



