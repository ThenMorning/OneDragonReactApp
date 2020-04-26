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
  constructor(props) {
    this.props = props;
    this.state = {
      count: 1,
    };
  }
  render() {
    const { count } = this.state;
    const { name } = this.props;
    return (
      <div>
        <h1 style={{ color: "red" }}>{count}条龙</h1>
        <Son name={name}></Son>
      </div>
    );
  }
}


function Son(props) {
  const { name } = this.props;
  return <span className="big">React{name}</span>;
}
ReactDOM.render(
  <ClassComponent name={"还行吧"} />,
  document.getElementById("root")
);
