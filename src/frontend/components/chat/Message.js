import React, { Component } from 'react';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="message">
                <div className="message-username"> {this.props.username} </div>
                <div className="message-text"> {this.props.content} </div>
            </div>

        );
    }
}

export default Message;