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
            <Message key={index} username={message.senderId} content={message.parts[0].payload.content} />

            <div className="message">
              <div className="message-username"> {message.senderId} </div>
              <div className="message-text"> {message.parts[0].payload.content} </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
