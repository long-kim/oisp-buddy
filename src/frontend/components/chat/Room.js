import React, { Component } from "react";
import { db } from "./firebase";
import * as stylee from "./style.css";
var moment = require("moment");

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      lastMessage: "",
      time: moment(),
      roomImgURL: ""
    };
  }

  componentDidMount() {
    let roomRef = db.collection("rooms").doc(this.props.roomID.toString());

    roomRef
      .get()
      .then(doc => {
        this.setState({
          groupName: doc.data().name,
          roomImgURL: doc.data().photoURL
        });
      })
      .catch(function(error) {
        console.error("Error getting document: ", error);
      });

    roomRef
      .collection("messages")
      .orderBy("time", "desc")
      .limit(1)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            lastMessage: doc.data().content,
            time: moment(doc.data().time.toDate())
          });
        });
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
              {this.state.groupName} <br />
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
