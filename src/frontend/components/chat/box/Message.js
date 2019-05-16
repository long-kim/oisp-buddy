import React, { Component } from "react";
import axios from "axios";

class Message extends Component {
  constructor(props) {
    super(props);
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
        <div className="message-username"> {this.props.username} </div>
        <div className="box-mess">
          <div className="message-text"> {this.props.message} </div>
        </div>
      </div>
    );
  }
}

export default Message;
