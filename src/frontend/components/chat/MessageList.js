import React, { Component } from "react";
import "assets/styles/Chat.css";

const DUMMY_DATA = [
  {
    senderId: "perborgen",
    text: "Hey, how is it going?"
  },
  {
    senderId: "perborgen",
    text: "Are you still there?"
  },
  {
    senderId: "janedoe",
    text: "Great! How about you?"
  },
  {
    senderId: "perborgen",
    text: "Good to hear! I am great as well"
  }
];

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="message-list">
        {DUMMY_DATA.map(function (message, index) {
          return (
            <div key={index} className="message">
              <div className="message-username"> {message.senderId} </div>
              <div className="message-text"> {message.text} </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
