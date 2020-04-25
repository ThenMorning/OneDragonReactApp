const render = (vDom, container) => {
  let vRealDom;
  // 如果是字符串或者数字直接渲染,不过为了以后判断元素类型简单，我们尽量保证基本类型都为string
  if (typeof vDom === "number") vDom = String(vDom);
  if (typeof vDom === "string") {
    vRealDom = document.createTextNode(vDom);
  } else {
    // 创建当前元素
    vRealDom = document.createElement(vDom.type);
    // 如果有子元素，那么渲染子元素
    if (vDom.props.children) {
      //子元素是数组，递归渲染
      if (vDom.props.children instanceof Array) {
        vDom.props.children.map((child) => render(child, vRealDom));
      } else {
        //非数组直接渲染
        render(vDom.props.children, vRealDom);
      }
    }
  }
  container.appendChild(vRealDom);
};

export default {
  render,
};
