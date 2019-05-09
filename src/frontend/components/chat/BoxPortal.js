import React, { Component } from "react";
import ReactDOM from "react-dom";

class BoxPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const haveTarget = document.getElementsByClassName(this.props.target)[0];
    return haveTarget
      ? ReactDOM.createPortal(this.props.children, haveTarget)
      : null;
  }
}

export default BoxPortal;
