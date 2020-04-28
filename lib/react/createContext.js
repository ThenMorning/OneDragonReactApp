import React from "./index";
function createContext(defaultValue,cb) {
  return {
    Provider: class Provider extends React.Component {
      constructor(props) {
        super(props);
        const currentValue = this.props.value;
        Provider.currentValue = currentValue || defaultValue;
        Provider.setValue = (value) => {
          if(cb){
            Provider.currentValue = cb(Provider.currentValue,value);
          }else{
            Provider.currentValue = value;
          }
        };
      }
      render() {
        return this.props.children;
      }
    },
    Consumer: [],
  };
}

export default createContext;
