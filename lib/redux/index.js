export const createStore = (defaultStore, reducer, plugins) => {
  return {
    value: defaultStore,
    reducer,
    dispatchDoll: applyMiddleware(plugins),
  };
};

export const bindActionCreators = (actionsMapping, dispatch) => {
  const bindedActionsMapping = {};
  Object.keys(actionsMapping).map((mapping) => {
    bindedActionsMapping[mapping] = (payload) => {
      // if (typeof actionsMapping[mapping] === "function") {
      //   actionsMapping[mapping](payload)(dispatch);
      // } else {
      //   dispatch(actionsMapping[mapping](payload));
      // }
      dispatch(actionsMapping[mapping](payload))
    };
  });
  return bindedActionsMapping;
};

export const applyMiddleware = (plugins) => {
  // 这是被传进来真实的dispatch
  return (dispatch) => {
    // 套娃的最初是真实的dispatch
    let dispatchDoll = dispatch;
    // 函数柯里化
    const res= plugins.reduce((dispatchDoll, currentPlugin) => {
      dispatchDoll =currentPlugin(dispatchDoll);
      return dispatchDoll;
    }, dispatchDoll);
    return res;
  };
};


// const step2 = (v)=>(o)=>{console.log(v,o)};
// const step1 = (v)=>(o)=>{console.log("step1",o)};

// //先执行step1  
// step1() //这个只是 (o)=>{console.log("step1",o)}; 
// step1()("1"); // 这个执行了后面这个方法；
// // 怎么执行step2呢？先把step2传到后面这个方法中
// step1(step2)("1");
// //改下step1
// const step1 = (v)=>(o)=>{console.log("step1",o);step2()}; // step2执行了，试试传参数
// const step1 = (v)=>(o)=>{console.log("step1",o);step2(v)}; // step2有参数了，但是只是返回(o)=>{console.log(v,o)}; 没有执行
// //改下
// const step1 = (v)=>(o)=>{console.log("step1",o);step2(v)(o)}; // step2 ok了 但是step2(v) 这个好像直接就可以传进来 如果不传进来，现在是2层，如果是10层你要手动写10层参数，没法使用api完成
// //改下
// const step1 = (v)=>(o)=>{console.log("step1",o);v(o)}; 
// step1(step2(v))("1"); //这样就可以了

// // 是不是和我们的需求很像？
// plugin_dispatch1(plugin_dispatch2(dipatch))(action)
// //先执行plugin_dispatch2(dipatch)的前部分操作，将真正的dispatch存下来
// //然后plugin_dispatch1将plugin_dispatch2(dipatch)的后半部分操作当作自己的dispatch
// //最后 plugin_dispatch1(plugin_dispatch2(dipatch))(action)的时候，相当于 执行完 plugin_dispatch1() 然后调用 plugin_dispatch2()(action)
