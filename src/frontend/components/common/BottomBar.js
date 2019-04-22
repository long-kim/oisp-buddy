import React, { Component } from "react";
import ChatBox from "frontend/components/chat/ChatBox.js";

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <ChatBox />;
  }
}

export default BottomBar;
