import React, { Component } from "react";
import MessageList from "./MessageList";
import Chatkit from "@pusher/chatkit-client";
import { tokenUrl, instanceLocator, secretkey } from "./config";

class ChatBox extends Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
    }


    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: "jimcbl",
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })

        chatManager.connect().then(currentUser => {
            currentUser.subscribeToRoomMultipart({
                roomId: currentUser.rooms[0].id,
                hooks: {
                    onMessage: message => {
                        // console.log("From user:", message.senderId);
                        // console.log("Received message:", message.parts[0].payload.content);
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            });
        });
    }

    render() {
        
        return <MessageList messages={this.state.messages} />;
    }
}

export default ChatBox;
