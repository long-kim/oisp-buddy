import React, { Component } from "react";
import Room from "./Room";
import { ListGroup } from "react-bootstrap";
import { BrowserRouter as _Router, _Route, Link } from "react-router-dom";
import axios from "axios";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ListGroup>
        {this.props.roomlist.map(function(room, index) {
          return (
            <ListGroup.Item key={index}>
              <Link className="chat-obj" to={`chat/./${room.room_id}`}>
                <Room id={room.room_id} name={room.name} avatar={room.avatar} />
              </Link>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default RoomList;
