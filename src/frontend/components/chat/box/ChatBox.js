import React, { Component } from "react";

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
      roomID: this.props.match.params.roomID,
      avatar: ""
    };

    axios
      .get(`/api/chats/${this.state.roomID}/info`)
      .then(response => {
        this.setState({
          roomName: response.data.name,
          avatar: response.data.avatar
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.roomName && (
          <div className="chatbox-bottomShow">
            <BoxHeader
              roomName={this.state.roomName}
              avatar={this.state.avatar}
            />
            <MessageList roomID={this.state.roomID} />
          </div>
        )}
        {/* <div className="chatbox-bottomShow"> */}
      </div>
    );
  }
}

export default ChatBox;
