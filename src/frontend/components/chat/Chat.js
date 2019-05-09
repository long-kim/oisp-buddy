import React, { Component } from "react";
// import RoomList from "./RoomList";
import { Button } from "react-bootstrap";
import { BrowserRouter as _Router, _Route, Link } from "react-router-dom";
import axios from "axios";
import Room from "./Room";
import { ListGroup } from "react-bootstrap";

// this.handleRoomList = this.handleRoomList.bind(this);
// this.handleRoomID = this.handleRoomID.bind(this);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomlist: [],
      roomClickYet: true
    };
    this.handleClick = this.handleClick.bind(this);
    axios
      .get(`/api/chats/`)
      .then(response => {
        this.setState({ roomlist: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleClick = () => {
    console.log("room click");
    this.setState({
      roomClickYet: !this.state.roomClickYet
    });
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.show !== prevProps.show) {
      this.setState({ roomClickYet: true });
    }
  }

  render() {
    console.log("this.props.show", this.props.show);
    console.log("this.state.roomClickYet", this.state.roomClickYet);
    return (
      <div className="chat-popup-lst">
        <div
          className={this.props.show && this.state.roomClickYet ? "" : "hidden"}
        >
          <div className="header">New Message</div>

          <ListGroup>
            {this.state.roomlist.map((room, index) => {
              return (
                <ListGroup.Item key={index}>
                  <Room
                    index={index}
                    id={room.room_id}
                    name={room.name}
                    avatar={room.avatar}
                    count={this.state.count}
                  />
                  <div
                    className="clickPurpose"
                    onClick={this.handleClick.bind(this)}
                  />
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default Chat;
