import React, { Component } from "react";
import axios from "axios";
import ChatBox from "./box/ChatBox";
import BoxPortal from "./BoxPortal";
import firebase from "./firebase";
import _ from "lodash";
const moment = require("moment");

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastMessage: {},
      time: "",
      showBox: false,
      haveMessages: false,
      roomInfo: []
    };

    this.db = firebase.firestore();

    this.roomRef = this.db
      .collection("rooms")
      .doc(this.props.room_id.toString());

    this.messageRef = this.roomRef.collection("messages");

    this.roomRef.get().then(docSnapshot => {
      if (!docSnapshot.exists) {
        this.roomRef.set({});
      }
    });

    axios
      .get(`/api/chats/${this.props.room_id}/fullinfo`)
      .then(response => {
        // console.log(response.data);
        this.setState({ roomInfo: response.data });
        // debugger;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidMount() {
    this.unsubscribe = this.messageRef
      .orderBy("time", "desc")
      .limit(1)
      .onSnapshot(snapshot => {
        let newMessage = [];
        snapshot.forEach(doc => {
          newMessage = [...newMessage, doc.data()];
        });
        if (newMessage.length) {
          this.setState({
            lastMessage: newMessage[0],
            time: moment(newMessage[0].time.toDate()).fromNow(),
            haveMessages: true
          });
        } else {
          this.setState({
            haveMessages: false
          });
        }
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleClick = () => {
    if (_.includes(this.props.roomShowing, this.props.room_id)) return;
    this.setState({
      showBox: true
    });
    if (!this.state.showBox) {
      this.props.callbackFromParent(this.props.room_id);
    }
  };

  handleCloseBox = () => {
    this.setState({
      showBox: !this.state.showBox
    });
  };

  render() {
    return (
      <div>
        {this.state.haveMessages && (
          <div onClick={this.handleClick.bind(this)}>
            <div className="chat">
              <div className="left">
                <img src={this.props.avatar} alt="avatar" />
                <div>
                  <div className="roomName">{this.props.name}</div>
                  <div className="last-mess">
                    {this.state.lastMessage.content}
                  </div>
                </div>
              </div>

              <div className="chat-time-sm">{this.state.time}</div>
            </div>
          </div>
        )}
        <div>
          {this.state.showBox && (
            <BoxPortal target="targetForBox">
              <ChatBox
                handleCloseBox={this.handleCloseBox}
                callbackFromParent={this.props.callbackFromParent}
                fullInfo={this.state.roomInfo}
                userActive={this.props.userActive}
                room_id={this.props.room_id}
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
