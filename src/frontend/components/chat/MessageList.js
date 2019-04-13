import React, { Component } from "react";
import "assets/styles/Chat.css";
import Message from "./Message"



// const activeUser = "perborgen";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="message-list">
        {this.props.messages.map(function (message, index) {
          return (
            <Message key={index} username={message.senderId} content={message.text} />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
