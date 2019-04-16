import React, { Component } from "react";
import "assets/styles/Chat.css";
import Message from "./Message";
import firebase from "firebase";

// const activeUser = "perborgen";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.messageRef = firebase
      .database()
      .ref()
      .child("messages")
      .child("rooms");
  }

  componentDidMount() {
    this.messageRef.on("value", message => {
      if (message.val()) {
        this.setState({
          messages: Object.values(message.val())
        });
      }
    });
  }

  render() {
    // console.log(this.state.messages);
    return (
      <div className="message-list">
        {this.state.messages.map(function(item, index) {
          return (
            <Message
              key={index}
              username={item.username}
              message={item.message}
              time={item.time}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
