import React, { Component } from "react";

import firebase from "firebase";
import { Form } from "react-bootstrap";

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      username: "",
      roomID: "",
      time: ""
    };

    this.messageRef = firebase
      .database()
      .ref()
      .child("messages")
      .child("rooms");
  }

  componentDidUpdate() {
    if (!this.state.username && this.props.user) {
      this.setState({ username: this.props.user.displayName });
    }
  }

  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSend() {
    if (this.state.message) {
      let newItem = {
        username: this.state.username,
        message: this.state.message,
        time: new firebase.firestore.Timestamp.now()
      };
      this.messageRef.push(newItem);
      this.setState({ message: "" });
    }
  }

  render() {
    return (
      <Form.Control
        type="text"
        placeholder="type something"
        value={this.state.message}
        onChange={this.handleChange.bind(this)}
        onKeyPress={this.handleKeyPress.bind(this)}
      />
    );
  }
}

export default FormInput;
