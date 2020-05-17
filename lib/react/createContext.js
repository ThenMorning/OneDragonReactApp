import React from "./index";
function createContext(defaultValue,cb) {
  return {
    Provider: class Provider extends React.Component {
      constructor(props) {
        super(props);
        console.log(props)
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
        return <div className={this.props.className}>{this.props.children}</div>;
      }
    },
    Consumer: [],
  };
}

export default createContext;
