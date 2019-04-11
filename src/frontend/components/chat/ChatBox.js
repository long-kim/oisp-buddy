import React, { Component } from "react";
import MessageList from "./MessageList";
import Chatkit from "@pusher/chatkit-client";
require("dotenv").config();

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {/* <div> {} </div> */}
        <MessageList />
      </div>
    );
  }
}

export default ChatBox;
