export const createStore = (defaultStore) => {
  return { value: defaultStore,cb};
};

const cb= (state,newState) => {
    console.log(state,newState)
    return newState;
} 


