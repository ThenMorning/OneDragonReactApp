import React from "../lib/react";
import ReactDOM from "../lib/react-dom";

// const vDom = (
//   <div>
//     <h1 style={{ color: "red" }}>一条龙</h1>
//     <span className="big">React</span>
//   </div>
// );
// console.log(vDom)

class ClassComponent {
  constructor() {
    this.state = {
      count: 1,
    };
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <h1 style={{ color: "red" }}>{count}条龙</h1>
        <span className="big">React</span>
      </div>
    );
  }
}
ReactDOM.render(<ClassComponent />, document.getElementById("root"));
