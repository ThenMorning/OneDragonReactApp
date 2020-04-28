import React from "../lib/react";
import { connnect } from "../lib/react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ConnectSon1 />
        <ConnectSon2 />
      </div>
    );
  }
}

class Son1 extends React.Component {
  render() {
    return (
      <div>
        Son1 {this.props.a}
        <button
          onClick={() => {
            this.props.setStore({
              store: {
                a: this.props.a + 1,
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

class Son2 extends React.Component {
  render() {
    return (
      <div>
        Son2 {this.props.a}
        <button
          onClick={() => {
            this.props.setStore({
              store: {
                a: this.props.a + 2,
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

const ConnectSon1 = connnect(
  (store) => {
    return store;
  },
  (util) => {
    return util;
  }
)(Son1);
const ConnectSon2 = connnect(
  (store) => {
    return store;
  },
  (util) => {
    return util;
  }
)(Son2);
export default App;

// export default connnect(
//   (store) => {
//     return store;
//   },
//   (util) => {
//     console.log(util)
//     return util;
//   }
// )(App);
