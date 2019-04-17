import React, { Component } from "react";
import Room from "./Room";
import { ListGroup } from "react-bootstrap";

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
            <ListGroup.Item key = {index}>
              <Room roomID={room} />{" "}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default RoomList;
