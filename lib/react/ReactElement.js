const ReactElement = (type, attrs, props) => {
  const element = {
    key: (attrs && attrs.key) || null, //元素同一层级唯一id
    type, //元素类型
    attrs, //元素特征
    props, //元素属性
  };
  return element;
};
export default ReactElement;
