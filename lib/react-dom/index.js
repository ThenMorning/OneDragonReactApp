import { diff, diffNode } from "./diff";

const render = (vnode, container, dom) => {
  return diff(dom, vnode, container);
};

export function setComponetProps(comp, props = {}) {
  if (!comp.base) {
    comp.componentWillMount && comp.componentWillMount();
  }
  if (comp.componentWillReceiveProps) {
    comp.componentWillReceiveProps(props);
  }
  Object.assign(comp.props || {}, props || {});
  renderComponent(comp);
}

export function setComponetContext(comps) {
  for (let i = 0; i < comps.length; i++) {
    comps[i].context = comps[i].contextType.Provider.currentValue;
    renderComponent(comps[i]);
  }
}

export function renderComponent(comp) {
  let base;
  const renderer = comp.render();
  base = diffNode(comp.base, renderer);
  if (base) {
    base["constructor"] = comp.constructor; // 在真实dom上标记组件构造器，用来判断diff
    base["$component"] = comp; // 在真实dom上标记组件实例，用来在diff的时候 替代真实dom 和 组件vdom 对比
  }
  if (comp.base && comp.componentWillUpdate) {
    comp.componentWillUpdate();
  }
  if (comp.base) {
    if (comp.componentDidUpdate) {
      comp.componentDidUpdate();
    }
  } else if (comp.componentDidMount) {
    comp.componentDidMount();
  }
  comp["base"] = base;
}

// const setAttrs = (dom, attrs) => {
//   //遍历赋值
//   Object.keys(attrs).forEach((key) => {
//     const value = attrs[key];
//     setAttr(dom, key, value);
//   });
// };

export const setAttr = (dom, key, value) => {
  if (key === "className") {
    key = "class";
  }
  if (/on\w+/.test(key)) {
    key = key.toLowerCase();
    dom[key] = value || "";
  } else if (key === "style") {
    if (!value || typeof value === "string") {
      dom.style.cssText = value || "";
    } else if (value && typeof value === "object") {
      for (let k in value) {
        if (typeof value[key] === "number") {
          dom.style[k] = value[k] + "px";
        } else {
          dom.style[k] = value[k];
        }
      }
    }
  } else {
    if (key in dom) {
      dom[key] = value | "";
    }
    if (value) {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key, value);
    }
  }
};

export default {
  render,
};
