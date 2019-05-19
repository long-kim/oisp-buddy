import React, { Component } from "react";
import { BrowserRouter as _Router, _Route, Link } from "react-router-dom";
import axios from "axios";
import Room from "./Room";
import { ListGroup } from "react-bootstrap";
import BoxPortal from "./BoxPortal";
import ChatBoxNew from "./box/ChatBoxNew";
import _ from "lodash";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userActive: undefined,
      roomlist: [],
      roomClickYet: true,
      content: "",
      userSearch: [],
      roomFound: [],
      roomShowing: []
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
          axios
            .post(`api/chats/newroom`, { user_id: myitem.user_id })
            .then(res => {
              this.myCallback(res.data.room_id);
              this.setState({ roomFound: [...this.state.roomFound, res.data] });
            });
        } else {
          if (_.includes(this.state.roomShowing, res.data.room_id)) return;
          this.myCallback(res.data.room_id);
          this.setState({ roomFound: [...this.state.roomFound, res.data] });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleSearch() {
    axios
      .post(`/api/users/find/`, { content: this.state.content })
      .then(res => this.setState({ userSearch: res.data }))
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.setState({ roomClickYet: true });
    }
  }

  myCallback = dataFromChild => {
    console.log("dataFromChild", dataFromChild);
    let newarr = this.state.roomShowing;
    if (_.includes(this.state.roomShowing, dataFromChild)) {
      _.remove(newarr, item => {
        return item === dataFromChild;
      });
    } else {
      newarr.push(dataFromChild);
    }
    this.setState({ roomShowing: newarr });
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
                  room_id={room.room_id}
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
              {/* <div className="new-mess">New Message</div> */}
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
                    roomShowing={this.state.roomShowing}
                    roomFound={this.state.roomFound}
                    userActive={this.state.userActive}
                    callbackFromParent={this.myCallback}
                    index={index}
                    room_id={room.room_id}
                    name={room.first_name + " " + room.last_name}
                    avatar={room.avatar}
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
