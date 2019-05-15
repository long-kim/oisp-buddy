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
      alreadyShow: false,
      roomInfo: []
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
      .get(`/api/chats/${this.props.id}/fullinfo`)
      .then(response => {
        // console.log(response.data);
        this.setState({ roomInfo: response.data });
        // debugger;
      })
      .catch(function(error) {
        console.log(error);
      });

    // axios
    //   .get(`/api/chats/${this.props.id}/info`)
    //   .then(response => {
    //     this.setState({
    //       info: response.data
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    // console.log("id:", this.props.id, ".....", this.props.roomFound);
  }

  handleClick = () => {
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
              <ChatBox
                fullInfo={this.state.roomInfo}
                userActive={this.props.userActive}
                roomID={this.props.id}
                name={this.props.name}
                avatar={this.props.avatar}
              />
            </BoxPortal>
          )}
        </div>
      </div>
    );
  }
}

export default Room;
