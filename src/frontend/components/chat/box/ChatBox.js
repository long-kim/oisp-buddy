import React, { Component } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// const appRoot = document.getElementsByClassName("app");

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessList: true,
      showBox: true
    };
  }

  handleHeaderClick() {
    this.setState({ showMessList: !this.state.showMessList });
  }

  handleClose() {
    // this.setState({ showBox: false });
    this.props.handleCloseBox();
    this.props.callbackFromParent(this.props.room_id);
  }

  render() {
    return (
      <div className="chatbox-row">
        {this.state.showBox && (
          <div className="chatbox-bottomShow">
            <div
              className="boxHeader"
              onClick={this.handleHeaderClick.bind(this)}
            >
              <div className="box-left">
                <img src={this.props.avatar} alt="avatar" />
                <p>{this.props.name} </p>
              </div>
              <div className="box-right" onClick={this.handleClose.bind(this)}>
                <FontAwesomeIcon icon={faTimes} size="lg" color="#a56a4b" />
              </div>
            </div>

            {this.state.showMessList && (
              <MessageList
                room_id={this.props.room_id}
                fullInfo={this.props.fullInfo}
                userActive={this.props.userActive}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ChatBox;
