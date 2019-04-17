import React, { Component } from "react";
import "assets/styles/Chat.css";
import Message from "./Message";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: "",
      messages: []
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="message-list">
        {this.state.messages.map(function(item, index) {
          return (
            <Message
              key={index}
              username={item.username}
              message={item.content}
              time={item.time}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
