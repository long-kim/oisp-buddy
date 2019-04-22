import React, { Component } from "react";
import RoomList from "./RoomList";
import { Button } from "react-bootstrap";
import { BrowserRouter as _Router, _Route, Link } from "react-router-dom";
import axios from "axios";

// this.handleRoomList = this.handleRoomList.bind(this);
// this.handleRoomID = this.handleRoomID.bind(this);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      roomlist: [],
      roomID: ""
    };
    axios
      .get(`/api/chats/users/${this.state.userID}`)
      .then(response => {
        this.setState({ roomlist: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {}

  render() {
    return (
      <div style={this.props.style_props} className="chat-popup-lst">
        <RoomList roomlist={this.state.roomlist} />
      </div>
    );
  }
}

export default Chat;
