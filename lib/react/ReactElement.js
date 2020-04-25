const ReactElement = (type,attrs,props)=>{
    const element = {
        type, //元素类型
        attrs,//元素特征
        props //元素属性
    }
    return element;
}
export default  ReactElement;