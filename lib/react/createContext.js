import React from "./index";
function createContext(defaultValue) {
  return {
    Provider: class Provider extends React.Component {
      render() {
        const currentValue = this.props.value;
        Provider.currentValue = currentValue || defaultValue;
        console.log(Provider.currentValue)
        return <div>{this.props.children}</div>;
      }
    },
  };
}

export default createContext;
