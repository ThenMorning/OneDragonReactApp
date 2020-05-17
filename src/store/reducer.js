import { ACTION_EDIT_A, ACTION_ASYNCFETCH_DATA } from "./action";

export default (state, action) => {
  switch (action.type) {
    case ACTION_EDIT_A:
      Object.assign(state, Object.assign(state.store, { a: action.payload }));
      break;
    case ACTION_ASYNCFETCH_DATA:
      Object.assign(
        state,
        Object.assign(state.store, { asyncData: action.payload })
      );
      break;
    default:
  }
  return state;
};
