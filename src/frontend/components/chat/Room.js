import React, { Component } from "react";
import axios from "axios";
import ChatBox from "./box/ChatBox";
import BoxPortal from "./BoxPortal";

var moment = require("moment");

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastMessage: "",
      time: moment().format("LT"),
      boxHidden: false,
      info: {}
    };

    axios
      .get(`/api/chats/${this.props.id}/last`)
      .then(response => {
        // console.log(response.data.content);
        this.setState({
          lastMessage: response.data[0].content,
          time: moment(response.data[0].createdAt).format("LT")
        });
        // debugger;
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get(`/api/chats/${this.props.id}/info`)
      .then(response => {
        this.setState({
          info: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleClick = () => {
    console.log("hmmmm");
    this.setState({ boxHidden: !this.state.boxHidden });
  };

  render() {
    return (
      <div>
        <div onClick={this.handleClick.bind(this)}>
          <div className="chat">
            <div className="left">
              <img src={this.props.avatar} />
              <div>
                <div className="roomName">{this.props.name}</div>
                {this.state.lastMessage} <br />
              </div>
            </div>

            <div className="chat-time-sm">{this.state.time}</div>
          </div>
        </div>
        <div>
          {this.state.boxHidden && (
            <BoxPortal target="targetForBox">
              <ChatBox roomID={this.props.id} />
            </BoxPortal>
          )}
        </div>
      </div>
    );
  }
}

export default Room;
