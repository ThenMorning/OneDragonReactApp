import React from "./index";
function createContext(defaultValue) {
  return {
    Provider: class Provider extends React.Component {
      constructor(props) {
        super(props);
        const currentValue = this.props.value;
        Provider.currentValue = currentValue || defaultValue;
        Provider.setValue = (value) => {
          Provider.currentValue = value;
        };
      }
      render() {
        return <div>{this.props.children}</div>;
      }
    },
    Consumer: [],
  };
}

export default createContext;
