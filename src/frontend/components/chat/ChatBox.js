import React, { Component } from "react";
import MessageList from "./MessageList";



class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <MessageList />
      </div>
    );
  }
}

export default ChatBox;
