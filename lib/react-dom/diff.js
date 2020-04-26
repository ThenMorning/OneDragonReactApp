import {setAttr} from "./index"
export const diff = (dom, vnode, container) => {
  // 每个vnode都是一棵树 我们就从每个vnode开始遍历 和之前的dom相同层级节点对比，然后更新，拿到返回的更新过后的dom
  const diffedDom = diffNode(dom, vnode);
  if (container && diffedDom.parentNode !== container) {
    container.appendChild(diffedDom);
  }
};

export const diffNode = (dom, vnode) => {
  let diffedDom = dom; //返回值初始化
  // 判断vnode合法性
  if (vnode === undefined || vnode === null || typeof vnode === "boolean") {
    vnode = "";
  }
  // 和render原来的流程一样  数字也统一成字符串
  if (typeof vnode === "number") vnode = String(vnode);
  // 如果当前节点为字符串
  if (typeof vnode === "string") {
    // 判断同层级的真实dom 是否也为字符串类型
    if (diffedDom && diffedDom.nodeType === 3) {
      // 如果是字符串类型且 内容和 我们将要更新的内容不同
      if (diffedDom.textContent !== vnode) {
        //更新内容
        diffedDom.textContent = vnode;
      }
    } else {
      // 如果不是字符串类型 创建新的文本节点
      diffedDom = document.createTextNode(vnode);
      if (diffedDom && diffedDom.parentNode) {
        // 替换
        diffedDom.parentNode.replaceNode(dom, diffedDom);
      }
    }
    return diffedDom;
  }
  // 前面是纯文本的比较 现在比较dom节点类型
  if (!diffedDom || !isSameNodeType(diffedDom, vnode)) {
    diffedDom = document.createElement(vnode.type);

    if (dom) {
      [...dom.childNodes].map(diffedDom.appendChild); // 将原来的子节点移到新节点下

      if (dom.parentNode) {
        dom.parentNode.replaceChild(diffedDom, dom); // 移除掉原来的DOM对象
      }
    }
  }
  diffAttrs(diffedDom,vnode);
  return diffedDom;
};

const isSameNodeType = (dom, vnode) => {
  // 纯文本
  if (typeof vnode === "string" || typeof vnode === "number") {
    return dom.nodeType === 3;
  }
  // 基本类型
  if (typeof vnode.type === "string") {
    return dom.nodeName.toLowerCase() === vnode.type.toLowerCase();
  }
  // classComponent 或者 functionComponent
  return dom && dom._component && dom._component.constructor === vnode.type;
};

const diffAttrs = (dom, vnode) =>{
    const oldAttrs = {};
    const newAttrs = vnode.attrs;
  
    const domAttrs = dom.attributes;
    [...domAttrs].forEach((item) => {
      oldAttrs[item.name] = item.value;
    });
    for (let key in oldAttrs) {
      if (!(key in newAttrs)) {
        setAttr(dom, key, undefined);
      }
    }
  
    for (let key in newAttrs) {
      if (oldAttrs[key] !== newAttrs[key]) {
        setAttr(dom, key, newAttrs[key]);
      }
    }
  }
