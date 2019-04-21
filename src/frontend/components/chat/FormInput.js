import React, { Component } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      userID: this.props.userID,
      roomID: this.props.roomID
    };
  }

  // componentDidUpdate() {}

  componentDidMount() {
    // console.log(this.props.roomID);
    // this.setState({ roomID: this.props.roomID, userID: this.props.userID });
  }

  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    if (this.state.content === "") return;
    this.handleSend();
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSend() {
    let mess = {
      content: this.state.content,
      userID: this.state.userID
    };

    axios
      .post(`/api/chats/rooms/${this.state.roomID}/post`, mess)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.error(error);
      });
    this.setState({
      content: ""
    });
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
