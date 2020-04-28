export const createStore = (defaultStore,reducer) => {
  return { value: defaultStore, reducer };
};

