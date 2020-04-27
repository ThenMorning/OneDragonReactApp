import React from "../lib/react";
import { connnect } from "../lib/react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  return <div>这是store{this.props.a}</div>;
  }
}
export default connnect(
  (store) => {
    return store;
  },
  () => {
    return null;
  }
)(App);
