import React from "../lib/react";
import ReactDOM from "../lib/react-dom";

const vDom = (
  <div key="3">
    <h1 key="1" style={{ color: "red" }}>
      一条龙
    </h1>
    <span key="2" className="big">
      React
    </span>
  </div>
);
ReactDOM.render(vDom, document.getElementById("root"));

// class ClassComponent extends React.Component {
//   constructor(props){
//       super(props);
//       this.state = {
//           count:1
//       }
//   }
//   onChange(e){
//       console.log(e.target.value)
//       this.setState({
//           count:e.target.value
//       })
//   }
//   render() {
//     const { count } = this.state;
//     return (
//       <div>
//         <h1 style={{ color: "red" }}>{count}条龙</h1>
//         <input onInput={this.onChange.bind(this)} style={{border:"1px solid"}}></input>
//         <Son name={count}></Son>
//       </div>
//     );
//   }
// }

// function Son(props) {
//   const { name } = this.props;
//   return <span className="big">React{name}</span>;
// }

// ReactDOM.render(
// <ClassComponent />,
//   document.getElementById("root")
// );
