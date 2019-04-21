import React, { Component } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import MessageList from "./MessageList";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "",
      messages: [],
      userID: 1,
      roomID: this.props.match.params.roomID
    };
  }
  // componentDidMount() {
  //   let roomID = this.props.match.params.roomID;
  //   this.setState({ roomID: roomID });
  // }

  render() {
    return (
      <div>
        <MessageList roomID={this.state.roomID} userID={this.state.userID} />
        <FormInput roomID={this.state.roomID} userID={this.state.userID} />
      </div>
    );
  }
}

export default ChatBox;
