import ReactElement from "./ReactElement";
import Component from "./Component";
import createContext from "./createContext"
const createElement = function(type, config, children){
  const childrenLength = arguments.length - 2;
  let props = {};
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }
  return ReactElement(type,config,props);
}

export const createComponent = (type,props )=>{
  let comp;
  // 如果type的原型上有render方法，说明是ClassComponent
    if(type.prototype && type.prototype.render){
        comp = new type(props);
    }else{
      comp = new Component(props);
      comp.constructor = type; // 为了方便组件在做diff算法时方便找到对应dom 
      comp.render = function(){
        return this.constructor(props);
      }
    }
  return comp;
}

export default {
  createElement,
  Component,
  createContext
}