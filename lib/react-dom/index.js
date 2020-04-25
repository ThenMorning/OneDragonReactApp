import ReactCompositeComponentWrapper from "./FunctionComponent";

const render = (vDom, container) => {
  let vRealDom;
  const {type,props,attrs} = vDom;
  // 如果type为function，为组件
  if(typeof type === "function" ){
      renderComponent(vDom,container)
      return;
  }
  // 如果是字符串或者数字直接渲染,不过为了以后判断元素类型简单，我们尽量保证基本类型都为string
  if (typeof vDom === "number") vDom = String(vDom);
  if (typeof vDom === "string") {
    vRealDom = document.createTextNode(vDom);
  } else {
    // 创建当前元素
    vRealDom = document.createElement(type);
    // 如果有子元素，那么渲染子元素
    if (vDom.props.children) {
      //子元素是数组，递归渲染
      if (props.children instanceof Array) {
        props.children.map((child) => render(child, vRealDom));
      } else {
        //非数组直接渲染
        render(props.children, vRealDom);
      }
    }
  }
  if (attrs) {
    setAttrs(vRealDom,attrs)
  }
  container.appendChild(vRealDom);
};


const renderComponent = (vDom,container)=>{
    const {type,props,attrs} = vDom;
    let cvDom,comp;
    // 如果type的原型上有render方法，说明是ClassComponent
    if(type.prototype && type.prototype.render){
        comp = new type; // 使用new关键字实例化一个类组件
        cvDom = comp.render(); //组件render方法返回的Jsx作为真正的render内容
        render(cvDom,container)
    }else{
        cvDom = type();
        render(cvDom,container)
    }
}


const setAttrs = (dom,attrs)=>{
  //遍历赋值
  Object.keys(attrs).forEach((key) => {
    const value = attrs[key];
    setAttr(dom, key, value);
  });
}

const setAttr=(dom,key,value)=>{
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
}

export default {
  render,
};
