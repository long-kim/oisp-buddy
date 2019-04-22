import React, { Component } from "react";
import "assets/styles/Chat.css";
import Message from "./Message";
import axios from "axios";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: "",
      messages: [],
      participantsID: [],
      partiArr: undefined,
      loadAllMess: false
    };

    axios
      .get(`/api/chats/rooms/${this.props.roomID}/messages`)
      .then(async response => {
        this.setState({ messages: response.data, loadAllMess: true });
      })
      .catch(function(error) {
        console.error(error);
      });

    axios
      .get(`/api/chats/rooms/${this.props.roomID}/participants`)
      .then(response => {
        this.setState({ participantsID: response.data });
        const newArr = this.state.partiArr ? this.state.partiArr : [];
        response.data.forEach(element => {
          axios.get(`/api/users/mongo/${element}`).then(async response => {
            await newArr.push({ key: element, value: response.data });
            // debugger;
            await this.setState({ partiArr: newArr });
            // console.log(this.state.partiArr);
          });
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  scrollToBottom = () => {
    setTimeout(() => {
      // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }, 0);
  };

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
        {this.state.partiArr &&
          this.state.partiArr.length === 2 &&
          this.state.messages.map((item, index) => {
            return (
              <Message
                key={index}
                userID={item.userID}
                message={item.content}
                time={item.time}
                partiArr={this.state.partiArr}
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
    );
  }
}

export default MessageList;
