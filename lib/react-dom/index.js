import { createComponent } from "../react";
import { diff } from "./diff";
// const render = (vDom, container) => {
//   console.log(vDom)
//   let vRealDom;
//   const {type,props,attrs} = vDom;
//   // 如果type为function，为组件
//   if(typeof type === "function" ){
//       const comp = createComponent(type,attrs)
//       comp.parent = container;
//       renderComponent(comp,container)
//       return;
//   }
//   // 如果是字符串或者数字直接渲染,不过为了以后判断元素类型简单，我们尽量保证基本类型都为string
//   if (typeof vDom === "number") vDom = String(vDom);
//   if (typeof vDom === "string") {
//     vRealDom = document.createTextNode(vDom);
//   } else {
//     // 创建当前元素
//     vRealDom = document.createElement(type);
//     // 如果有子元素，那么渲染子元素
//     if (vDom.props.children) {
//       //子元素是数组，递归渲染
//       if (props.children instanceof Array) {
//         props.children.map((child) => render(child, vRealDom));
//       } else {
//         //非数组直接渲染
//         render(props.children, vRealDom);
//       }
//     }
//   }
//   if (attrs) {
//     setAttrs(vRealDom,attrs)
//   }
//   container.appendChild(vRealDom);
// };

const render = (vnode, container, dom) => {
  return diff(dom, vnode, container);
};

export const renderComponent = (comp, container) => {
  let cvDom;
  cvDom = comp.render();
  render(cvDom, container);
};

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
