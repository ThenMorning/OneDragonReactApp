import React from "../lib/react";
import { connnect } from "../lib/react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        这是store{this.props.a}
        <button
          onClick={() => {
            this.props.setStore({
              store: {
                a: this.props.a+1,
              },
            });
          }}
        >
          click
        </button>
      </div>
    );
  }
}
export default connnect(
  (store) => {
    return store;
  },
  (util) => {
    console.log(util)
    return util;
  }
)(App);
