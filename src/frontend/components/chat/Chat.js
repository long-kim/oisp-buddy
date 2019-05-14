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
      roomClickYet: true,
      content: "",
      userSearch: []
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
    // axios.post(`/api/chat/find/`);
    console.log("click to user", myitem);
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

  render() {
    return (
      <div className="chat-popup-lst">
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
