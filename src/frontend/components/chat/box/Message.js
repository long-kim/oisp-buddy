import React, { Component } from "react";
import axios from "axios";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      avatar: this.props.avatar,
      message: this.props.message
    };
  }
  // componentDidMount() {
  //   this.setState({
  //     // userID: this.props.userID,
  //     username: getUsername(this.props.userID, this.props.partiArr)
  //   });
  // }

  render() {
    return (
      <div className="message">
        <div className="message-username"> {this.state.username} </div>
        <div className="box-mess">
          <div className="message-text"> {this.state.message} </div>
        </div>
      </div>
    );
  }
}

export default Message;
