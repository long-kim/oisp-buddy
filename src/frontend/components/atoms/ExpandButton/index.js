import React, { Component } from "react";

class ExpandButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  toggle = () => {
    const active = this.state.active;
    this.setState({ active: !active });
  };

  render() {
    return (
      <div
        className={`expand-btn ${this.props.className} ${
          this.state.active ? "active" : ""
        }`}
        onClick={this.toggle}
      >
        {this.props.children}
      </div>
    );
  }
}

export default ExpandButton;
