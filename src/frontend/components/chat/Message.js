import React, { Component } from "react";
import axios from "axios";

let getUsername = (id, arr) => {
  for (let i of arr) {
    if (i.key === id) return i.value;
  }
};

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      message: "",
      userID: ""
    };
  }
  componentDidMount() {
    this.setState({
      userID: this.props.userID,
      username: getUsername(this.props.userID, this.props.partiArr)
    });
  }

  render() {
    return (
      <div className="message">
        <div className="message-username"> {this.state.username} </div>
        <div className="message-text"> {this.props.message} </div>
      </div>
    );
  }
}

export default Message;
