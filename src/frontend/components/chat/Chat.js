import React, { Component } from "react";
import MessageList from "./MessageList";
import FormInput from "./FormInput";
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
      user: null,
      userID: null,
      roomlist: [],
      roomID: ""
    };
  }

  componentDidMount() {
    axios
      .get("/api/chats/users/1")
      .then(response => {
        // handle success
        // console.log(response.data);
        this.setState({ roomlist: response.data });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return <RoomList roomlist={this.state.roomlist} />;
  }
}

export default Chat;
