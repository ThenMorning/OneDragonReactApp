import { setAttr } from "./index";
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

  if (
    (vnode.props.children && vnode.props.children.length > 0) ||
    (diffedDom.childNodes && diffedDom.childNodes.length > 0)
  ) {
    diffChildren(diffedDom, vnode.props.children);
  }

  diffAttrs(diffedDom, vnode);
  return diffedDom;
};

const diffChildren = (dom, vChildren) => {
  // 拿到当前dom的子元素
  const domChildren = dom.childNodes;
  // 之前说过 如果有key 那么直接把有对应key的相比较，减少判断次数
  const unKey = []; // 没有key的元素
  const keyed = {}; // 有key的元素，把key和元素标记好
  if (domChildren.length > 0) {
    for (let k = 0; k < domChildren.length; k++) {
      const dChild = domChildren[k];
      const key = dChild.key;
      if (key) {
        keyed[key] = dChild;
      } else {
        unKey.push(dChild);
      }
    }
  }
  // vnode有子节点才对比
  if (vChildren && vChildren.length > 0) {
    for (let i = 0; i < vChildren.length; i++) {
      const vchild = vChildren[i];
      const vKey = vchild.key;
      let child;
      //这个节点有key
      if (vKey) {
        // 且在当前dom中也有这个key
        if (keyed[vKey]) {
          //取出这个child用来对比
          child = keyed[vKey];
          //去掉之前的存在，让别的key一样的拿不到
          keyed[vKey] = undefined;
        }
      } else {
        // 没找到对应key的 就判断元素类型是都一致
        for (let j = 0; j < unKey.length; j++) {
          let c = unKey[j];
          if (c && isSameNodeType(c, vchild)) {
            child = c;
            unKey[j] = undefined;
            break;
          }
        }
      }
      // 对比
      child = diffNode(child, vchild);
      // 更新DOM
      const f = domChildren[i];
      if (child && child !== dom && child !== f) {
        // 如果更新前的对应位置为空，说明此节点是新增的
        if (!f) {
          dom.appendChild(child);
          // 如果更新后的节点和更新前对应位置的下一个节点一样，说明当前位置的节点被移除了
        } else if (child === f.nextSibling) {
          removeNode(f);
          // 将更新后的节点移动到正确的位置
        } else {
          // 注意insertBefore的用法，第一个参数是要插入的节点，第二个参数是已存在的节点
          dom.insertBefore(child, f);
        }
      }
    }
  }
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

const diffAttrs = (dom, vnode) => {
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
};
