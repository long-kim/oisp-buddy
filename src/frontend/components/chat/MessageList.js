import React, { Component } from "react";
import "assets/styles/Chat.css";
import Message from "./Message";
import { db } from "./firebase";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: "",
      messages: []
    };
  }

  // componentDidMount() {
  //   this.messageRef.on("value", message => {
  //     if (message.val()) {
  //       this.setState({
  //         messages: Object.values(message.val())
  //       });
  //     }
  //   });
  // }
  componentDidMount() {
    let messageRef = db
      .collection("rooms")
      .doc(this.props.roomID.toString())
      .collection("messages")
      .orderBy("time")
      .limit(10);
    messageRef.onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        this.setState({ messages: [...this.state.messages, doc.data()] });
      });
    });
  }

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
