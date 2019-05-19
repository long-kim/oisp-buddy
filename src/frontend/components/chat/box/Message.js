import React, { Component } from "react";
import axios from "axios";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_info: {}
    };
  }
  componentDidMount() {
    if (this.props.user_id === this.props.fullInfo[0].user_id) {
      this.setState({ user_info: this.props.fullInfo[0] });
    } else {
      this.setState({ user_info: this.props.fullInfo[1] });
    }
    // }
  }

  render() {
    return (
      <div className="message">
        <div className="message-username">
          {this.state.user_info.first_name}
        </div>
        <div className="box-mess-wrap">
          <img
            className="avatar-icon"
            src={this.state.user_info.avatar}
            alt="ava-icon"
          />
          <div className="box-mess">
            <div className="message-text"> {this.props.message} </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
