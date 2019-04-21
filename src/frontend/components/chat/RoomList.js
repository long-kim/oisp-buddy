import React, { Component } from "react";
import Room from "./Room";
import { ListGroup } from "react-bootstrap";
import { BrowserRouter as _Router, _Route, Link } from "react-router-dom";
import { Message } from "firebase-functions/lib/providers/pubsub";

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
              <Link className="chat-obj" to={`chat/./${room}`}>
                <Room roomID={room} />
              </Link>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default RoomList;
