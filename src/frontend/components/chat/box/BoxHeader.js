import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class BoxHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="roomName-box">
        <div className="box-left">
          <img src={this.props.avatar} />
          <p>{this.props.roomName} </p>
        </div>
        <div className="box-right">
          <FontAwesomeIcon icon={faTimes} size="lg" color="#a56a4b" />
        </div>
      </div>
    );
  }
}

export default BoxHeader;
