import React from "../lib/react";
import ReactDOM from "../lib/react-dom";

const vDom = (
  <div>
    <h1 style={{ color: "red" }}>一条龙</h1>
    <span className="big">React</span>
  </div>
);
console.log(vDom)
ReactDOM.render(vDom, document.getElementById("root"));
