import React, { Component } from "react";
import MessageList from "./MessageList";
import FormInput from "./FormInput";
import RoomList from "./RoomList";
import { Button } from "react-bootstrap";
import { BrowserRouter as _Router, _Route, Link } from "react-router-dom";

class Chat extends Component {
  constructor(props) {
    super(props);
    // static Index;
    // static Single;
    this.state = {
      user: null,
      roomlist: [],
      roomID: ""
    };
  }

  componentDidMount() {}

  render() {
    return <h1>Chat</h1>;
  }
}

export default Chat;
