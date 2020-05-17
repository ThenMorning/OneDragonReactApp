import {renderComponent} from "../react-dom"

let setStateQueue = []; // 存放所有的setState
let renderQueue = []; // 存放所有执行setState的组件，用来更新

export function _setState(stateChange, component) {
  // 当更新状态队列为空时，我们创建一个异步任务，当所有同步任务(把所有的setState添加到队列中)完成后执行
  if (setStateQueue.length === 0) {
    Promise.resolve().then(flush);
  }
  setStateQueue.push({
    stateChange,
    component,
  });
  // 判断将要渲染的组件是否已经在更新队列中，确保一个批次中只渲染一次该组件
  let renderC = renderQueue.some((item) => {
    return item === component;
  });
  if (!renderC) {
    renderQueue.push(component);
  }
}

function flush() {
  let setState, component;
  while ((setState = setStateQueue.shift())) {
    const { stateChange, component } = setState;
    //保存之前的状态
    if (!component.prevState) {
      component.prevState = Object.assign({}, component.state);
    }
    // setState 有可能传入一个方法
    if (typeof stateChange === "function") {
      Object.assign(
        component.state,
        stateChange(component.prevState, component.props)
      );
    } else {
      Object.assign(component.state, stateChange);
    }
    component.prevState = component.state;
  }
  while ((component = renderQueue.shift())) {
    renderComponent(component);
  }
}
