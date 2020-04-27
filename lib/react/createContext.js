import React from "./index";
function createContext(defaultValue) {
  return {
    Provider: class Provider extends React.Component {
      render() {
        const currentValue = this.props.value;
        Provider.currentValue = currentValue || defaultValue;
        Provider.setValue = (value)=>{
          Provider.currentValue = value;
        }
        return <div>{this.props.children}</div>;
      }
    },
  };
}

export default createContext;
