import React, { Component } from "react";
import axios from "axios";
import * as stylee from "./style.css";
var moment = require("moment");

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "",
      lastMessage: "",
      time: moment(),
      roomImgURL: ""
    };
  }

  componentDidMount() {
    axios
      .get(`/api/chats/rooms/${this.props.roomID}`)
      .then(response => {
        // handle success

        this.setState({ roomName: response.data.roomName });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        {/* <div className="room-lst-left">
          <div className="room-small-avt">
            <img src={this.state.roomImgURL} />
          </div>
          <div className="room-info">
            <div className="room-name-sm">{this.state.groupName}</div>
            <div className="room-last-ms"> {this.state.lastMessage} </div>
          </div>
        </div>
        <div className="room-lst-right"> {this.state.time.format("LT")}</div> */}

        <div className="chat">
          <div className="left">
            <img src={this.state.roomImgURL} />
            <p>
              {this.state.roomName} <br />
              {this.state.lastMessage} <br />
            </p>
          </div>

          <div className="chat-time-sm">{this.state.time.format("LT")}</div>
        </div>
      </div>
    );
  }
}

export default Room;
