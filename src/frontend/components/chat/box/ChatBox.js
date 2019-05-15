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
      messages: [],
      roomID: this.props.roomID,
      showMessList: true,
      showBox: true
    };

    this.el = document.createElement("div");
  }

  handleHeaderClick() {
 
    this.setState({ showMessList: !this.state.showMessList });
  }

  handleHideClick() {
   
    this.setState({ showBox: false });
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
                <img src={this.props.avatar} />
                <p>{this.props.name} </p>
              </div>
              <div
                className="box-right"
                onClick={this.handleHideClick.bind(this)}
              >
                <FontAwesomeIcon icon={faTimes} size="lg" color="#a56a4b" />
              </div>
            </div>

            {this.state.showMessList && (
              <MessageList
                roomID={this.state.roomID}
                userActive={this.props.userActive}
              />
            )}
          </div>
        )}
        {/* <div className="chatbox-bottomShow"> */}
      </div>
    );
  }
}

export default ChatBox;
