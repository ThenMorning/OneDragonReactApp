import React from "../lib/react";
import ReactDOM from "../lib/react-dom";

// const vDom = (
//   <div key="3">
//     <h1 key="1" style={{ color: "red" }}>
//       一条龙
//     </h1>
//     <span key="2" className="big">
//       React
//     </span>
//   </div>
// );
// ReactDOM.render(vDom, document.getElementById("root"));

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  onChange(e) {
    this.setState({
      count: e.target.value,
    });
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <h1 key="2" style={{ color: "red" }}>
          {count}条龙
        </h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          click
        </button>

        {/* <input
          key="3"
          onInput={this.onChange.bind(this)}
          style={{ border: "1px solid" }}
        ></input>
        <Son name={count}></Son>
        <Son name={count + 7}></Son> */}
      </div>
    );
  }
}

function Son() {
  const { name } = this.props;
  return <div>React{name}</div>;
}

// ReactDOM.render(
// <ClassComponent />,
//   document.getElementById("root")
// );

const ThemeContext = React.createContext("12");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  onClick() {
    this.setState({
      count: 9,
    });
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <ThemeContext.Provider value={count}>
          <Toolbar />
        </ThemeContext.Provider>
        <h1 key="2" style={{ color: "red" }}>
          {count}
        </h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          click
        </button>
      </div>
    );
  }
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  constructor(props) {
    ThemedButton.contextType = ThemeContext;
    super(props);
  }
  render() {
    return (
      <button style={{ fontSize: this.context + "px" }}>{this.context}</button>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
