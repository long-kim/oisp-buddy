import React, { Component } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import MessageList from "./MessageList";
import BoxHeader from "./BoxHeader.js";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: undefined,
      messages: [],
      userID: 1,
      roomID: this.props.match.params.roomID
    };
    ///api/chats/rooms/1/
    ///chat/api/chats/rooms/1
    axios
      .get(`/api/chats/rooms/${this.state.roomID}`)
      .then(response => {
        this.setState({ roomName: response.data.roomName });
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  // componentDidMount() {
  //   let roomID = this.props.match.params.roomID;
  //   this.setState({ roomID: roomID });
  // }

  render() {
    return (
      <div>
        {this.state.roomName && (
          <div className="chatbox-bottomShow">
            <BoxHeader roomName={this.state.roomName} />
            <MessageList
              roomID={this.state.roomID}
              userID={this.state.userID}
            />
            <FormInput roomID={this.state.roomID} userID={this.state.userID} />
          </div>
        )}
        {/* <div className="chatbox-bottomShow"> */}
      </div>
    );
  }
}

export default ChatBox;
