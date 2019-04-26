import React, { Component } from "react";

class BoxHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: this.props.roomName
    };
  }
  render() {
    return <div className="roomName-box">{this.state.roomName}</div>;
  }
}

export default BoxHeader;
