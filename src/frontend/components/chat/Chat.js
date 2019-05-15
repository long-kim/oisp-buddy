import React, { Component } from "react";

import { BrowserRouter as _Router, _Route, Link } from "react-router-dom";
import axios from "axios";
import Room from "./Room";
import { ListGroup } from "react-bootstrap";
import BoxPortal from "./BoxPortal";
import ChatBoxNew from "./box/ChatBoxNew";
import _ from "lodash";
import firebase from "./config";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userActive: undefined,
      roomlist: [],
      oldRoomlist: [],
      roomClickYet: true,
      content: "",
      userSearch: [],
      roomFound: []
    };
    this.handleClick = this.handleClick.bind(this);

    axios
      .get(`api/chats/active`)
      .then(res => {
        this.setState({ userActive: res.data });
      })
      .catch(err => {
        console.error(err);
      });

    axios
      .get(`/api/chats/`)
      .then(async response => {
        this.setState({ oldRoomlist: response.data });
        response.data.map(room => {
          axios.get(`/api/chats/${room.room_id}/info`).then(async res => {
            let myobject = res.data;
            myobject.room_id = room.room_id;
            await this.setState({
              roomlist: [...this.state.roomlist, myobject]
            });
          });
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  handleClick = () => {
    this.setState({
      roomClickYet: !this.state.roomClickYet
    });
  };

  handleKeyPress(event) {
    // if (event.key !== "Enter") return;
    if (this.state.content === "") {
      this.setState({ userSearch: [] });
      return;
    }
    this.handleSearch();
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }
  handleFindRoom = myitem => {
    axios
      .post(`/api/chats/find/`, { user_id: myitem.user_id })
      .then(res => {
        if (!res.data) {
          // console.log("new room!!", res.data);
          axios
            .post(`api/chats/newroom`, { user_id: myitem.user_id })
            .then(res => {
              this.setState({ roomFound: [...this.state.roomFound, res.data] });
            });
        } else {
          if (_.some(this.state.roomFound, res.data)) return;
          this.setState({ roomFound: [...this.state.roomFound, res.data] });
        }
      })
      .catch(err => {
        console.error(err);
      });
    // console.log("roomFound", this.state.roomFound);
  };

  handleSearch() {
    axios
      .post(`/api/users/find/`, { content: this.state.content })
      .then(res => this.setState({ userSearch: res.data }))
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.show !== prevProps.show) {
      this.setState({ roomClickYet: true });
    }
  }

  myCallback = dataFromChild => {
    let newarr = this.state.roomFound;
    _.remove(newarr, x => {
      return x.friend_id == dataFromChild;
    });
    // console.log(newarr);
    this.setState({ roomFound: newarr });
  };

  render() {
    return (
      <div className="chat-popup-lst">
        {this.state.roomFound &&
          this.state.roomFound.map((room, index) => {
            return (
              <BoxPortal target="targetForBox" key={index}>
                <ChatBoxNew
                  userActive={this.state.userActive}
                  roomID={room.friend_id}
                  callbackFromParent={this.myCallback}
                />
              </BoxPortal>
            );
          })}
        <div
          className={this.props.show && this.state.roomClickYet ? "" : "hidden"}
        >
          <div className="header">
            <div className="header-top">
              <input
                type="text"
                placeholder="Search"
                value={this.state.content}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              />
              <div className="new-mess">New Message</div>
            </div>

            {this.state.userSearch.users && (
              <div className="search-result">
                {this.state.userSearch.users.map((item, index) => {
                  return (
                    <div
                      className="search-item"
                      key={index}
                      onClick={this.handleFindRoom.bind(this, item)}
                    >
                      {item.username}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <ListGroup>
            {this.state.roomlist.map((room, index) => {
              return (
                <ListGroup.Item key={index}>
                  <Room
                    roomFound={this.state.roomFound}
                    userActive={this.state.userActive}
                    index={index}
                    id={room.room_id}
                    name={room.first_name + " " + room.last_name}
                    avatar={room.avatar}
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
