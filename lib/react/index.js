import ReactElement from "./ReactElement";

export default {
    createElement:function(type, config, children){
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
}