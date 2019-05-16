import React, { Component } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// const appRoot = document.getElementsByClassName("app");

class ChatBoxNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      avatar: "",
      name: "",
      roomID: this.props.roomID,
      showMessList: true,
      showBox: true,
      roomInfo: []
    };
    axios
      .get(`/api/chats/${this.props.roomID}/info`)
      .then(response => {
        this.setState({
          avatar: response.data.avatar,
          name: response.data.first_name + " " + response.data.last_name
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get(`/api/chats/${this.props.roomID}/fullinfo`)
      .then(response => {
        // console.log(response.data);
        this.setState({ roomInfo: response.data });
        // debugger;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.el = document.createElement("div");
  }

  handleHeaderClick() {
    // console.log("header box on click");
    this.setState({ showMessList: !this.state.showMessList });
  }

  handleHideClick() {
    // console.log("icon on click");
    this.setState({ showBox: false });
    this.props.callbackFromParent(this.props.roomID);
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
                <img src={this.state.avatar} />
                <p>{this.state.name} </p>
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

export default ChatBoxNew;
