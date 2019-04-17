import React, { Component } from "react";
import { Form } from "react-bootstrap";

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      username: "",
      roomID: "",
      time: ""
    };
  }

  componentDidUpdate() {
    if (!this.state.username && this.props.user) {
      this.setState({ username: this.props.user.displayName });
    }
  }

  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSend() {}

  render() {
    return (
      <Form.Control
        type="text"
        placeholder="type something"
        value={this.state.message}
        onChange={this.handleChange.bind(this)}
        onKeyPress={this.handleKeyPress.bind(this)}
      />
    );
  }
}

export default FormInput;
