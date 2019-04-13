import React, { Component } from "react";
import MessageList from "./MessageList";
// import socketIOClient from "socket.io-client";
import FormInput from "./FormInput"

const DUMMY_DATA = [
    {
        senderId: "perborgen",
        text: "Hey, how is it going?"
    },
    {
        senderId: "perborgen",
        text: "Are you still there?"
    },
    {
        senderId: "janedoe",
        text: "Great! How about you?"
    },
    {
        senderId: "perborgen",
        text: "Good to hear! I am great as well"
    }
];

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            messages: DUMMY_DATA
        };
    }

    render() {
        return (
            <div>
                <MessageList messages={this.state.messages} />
                <FormInput />
            </div>

        )
    }
}

export default Chat;
