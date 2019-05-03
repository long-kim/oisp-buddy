import React, { Component } from "react";
import axios from "axios";

var moment = require("moment");

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastMessage: "",
      time: moment().format("LT")
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
            <img src={this.props.avatar} />
            <div>
              <div className="roomName">{this.props.name}</div>
              {this.state.lastMessage} <br />
            </div>
          </div>

          <div className="chat-time-sm">{this.state.time}</div>
        </div>
      </div>
    );
  }
}

export default Room;
