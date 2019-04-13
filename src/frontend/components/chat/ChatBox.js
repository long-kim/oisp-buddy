import React, { Component } from "react";
import MessageList from "./MessageList";





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

class ChatBox extends Component {
    constructor() {
        super()
        this.state = {
            messages: DUMMY_DATA
        }
    }

    render() {
        return <MessageList messages={this.state.messages} />;
    }
}

export default ChatBox;
