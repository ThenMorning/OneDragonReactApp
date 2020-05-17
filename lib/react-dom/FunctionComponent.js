//react-dom@15.4.2  instantiateReactComponent.js ReactCompositeComponentWrapper 函数式组件的实例化操作
// var ReactCompositeComponentWrapper = function (element) {
//     this.constructor(element);
//   };
//   _assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent, {
//     _instantiateReactComponent: instantiateReactComponent
//   });

// mountComponent(){
// //inst = new StatelessComponent(Component);

// }

// function StatelessComponent(Component) {}
// StatelessComponent.prototype.render = function () {
//   var Component = ReactInstanceMap.get(this)._currentElement.type;
//   var element = Component(this.props, this.context, this.updater); // 直接将type当构造函数执行了。
//   warnIfInvalidElement(Component, element);
//   return element;
// };
// export default ReactCompositeComponentWrapper;