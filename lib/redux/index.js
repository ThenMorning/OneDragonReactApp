export const createStore = (defaultStore, reducer) => {
  return { value: defaultStore, reducer };
};

export const bindActionCreators = (actionsMapping, dispatch) => {
  const bindedActionsMapping = {};
  Object.keys(actionsMapping).map((mapping) => {
    bindedActionsMapping[mapping] = (payload) => {
      if(typeof actionsMapping[mapping] === "function" ){
        actionsMapping[mapping](payload)(dispatch);
      }else{
        dispatch(actionsMapping[mapping](payload));
      }
    };
  });
  return bindedActionsMapping;
};
