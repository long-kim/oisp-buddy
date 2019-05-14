import React, { Component } from "react";
import "assets/styles/Chat.css";
import Message from "./Message";
import axios from "axios";
import { Form } from "react-bootstrap";
import io from "socket.io-client";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: this.props.roomID,
      content: "",
      messages: undefined,
      currentPage: 1
    };

    axios
      .get(`/api/chats/${this.props.roomID}?page=${this.state.currentPage}`)
      .then(res => {
        this.setState({ messages: res.data });
        // console.log("Hello", res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  scrollToBottom = () => {
    setTimeout(() => {
      // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }, 0);
  };

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
      content: this.state.content
    };

    axios
      .post(`/api/chats/${this.state.roomID}/new`, mess)
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

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    // console.log(this.state.partiArr);

    return (
      <div className="message-list">
        <div className="msg-lst">
          {this.state.messages &&
            this.state.messages.map((item, index) => {
              return (
                <Message
                  key={index}
                  username={item.User.username}
                  avatar={item.User.avatar}
                  message={item.content}
                  createdAt={item.createdAt}
                />
              );
            })}

          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>

        <Form.Control
          type="text"
          placeholder="type something"
          value={this.state.content}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
      </div>
    );
  }
}

export default MessageList;
