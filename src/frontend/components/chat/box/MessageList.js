import React, { Component } from "react";
import "assets/styles/Chat.css";
import Message from "./Message";
import axios from "axios";
import { Form } from "react-bootstrap";
import firebase from "../firebase";
import ScrollToBottom from "react-scroll-to-bottom";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: undefined,
      currentPage: 1,
      content: ""
    };

    // this.firebaseRef = firebase.firestore();

    this.db = firebase.firestore();

    this.roomRef = this.db
      .collection("rooms")
      .doc(this.props.room_id.toString());

    this.messageRef = this.roomRef.collection("messages");

    this.roomRef.get().then(docSnapshot => {
      if (!docSnapshot.exists) {
        this.roomRef.set({});
      }
    });
  }

  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    if (this.state.content === "") return;
    this.handleSend();
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSend() {
    this.messageRef
      .add({
        content: this.state.content,
        user_id: this.props.userActive,
        time: new Date()
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

    this.setState({
      content: ""
    });
  }

  componentDidMount() {
    this.unsubscribe = this.messageRef
      .orderBy("time", "desc")
      .limit(10)
      .onSnapshot(snapshot => {
        let newMessages = [];
        snapshot.forEach(doc => {
          newMessages = [...newMessages, doc.data()];
        });
        this.setState({
          messages: newMessages.reverse()
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidUpdate() {}

  render() {
    return (
      <div className="message-list">
        <div className="msg-lst">
          {this.state.messages &&
            this.props.fullInfo.length &&
            this.state.messages.map((item, index) => {
              return (
                <Message
                  key={index}
                  user_id={item.user_id}
                  fullInfo={this.props.fullInfo}
                  message={item.content}
                  createdAt={item.time}
                />
                // <h1>test</h1>
              );
            })}
          <div id="end-mess-list" />
        </div>

        <Form.Control
          type="text"
          placeholder="type something"
          value={this.state.content}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
      </div>
    );
  }
}

export default MessageList;
