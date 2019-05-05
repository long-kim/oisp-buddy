import React, { Component } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      roomID: this.props.roomID
    };
  }

  // componentDidUpdate() {}

  componentDidMount() {
    // console.log(this.props.roomID);
    // this.setState({ roomID: this.props.roomID, userID: this.props.userID });
  }



  render() {
    return (
      <Form.Control
        type="text"
        placeholder="type something"
        value={this.state.content}
        onChange={this.handleChange.bind(this)}
        onKeyPress={this.handleKeyPress.bind(this)}
      />
    );
  }
}

export default FormInput;
