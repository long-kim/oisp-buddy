import React, { Component } from "react";
import injectSheet from "react-jss";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { InputBase } from "@material-ui/core";

import firebase from "./firebase";
import Message from "./Message";

const styles = theme => ({
  chatContent: {
    height: 202,
    padding: 10,
    overflow: "scroll"
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: theme.palette.secondary["100"],
    boxShadow: [[0, -1, 3, "rgba(0, 0, 0, 0.1)"]],
    padding: [[0, 6]]
  },
  inputRoot: {
    height: 30,
    width: "100%",
    borderRadius: 15,
    backgroundColor: theme.palette.secondary["300"],
    padding: [[0, 16]]
  },
  inputInner: {
    fontSize: 14
  },
  sendButton: {
    marginLeft: 6
  }
});

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentPage: 1,
      input: "",
      chatRef: null
    };
    this.db = firebase.firestore();

    this.roomRef = this.db
      .collection("rooms")
      .doc(this.props.room_id.toString());

    this.messageRef = this.roomRef.collection("messages");

    this.roomRef.get().then(docSnapshot => {
      if (!docSnapshot.exists) {
        this.roomRef.set({});
      }
    });
  }

  componentDidMount() {
    this.unsubscribe = this.messageRef
      .orderBy("time", "desc")
      .limit(10)
      .onSnapshot(snapshot => {
        let newMessages = [];
        snapshot.forEach(doc => {
          newMessages = [...newMessages, doc.data()];
        });
        this.setState({
          messages: newMessages.reverse()
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { messages, chatRef } = this.state;
    if (messages !== prevState.messages) {
      chatRef.scrollTop = chatRef.scrollHeight - chatRef.clientHeight;
    }
  }

  handleChange = event => {
    this.setState({ input: event.target.value });
  };

  handleKeyPress = event => {
    if (event.key !== "Enter") return;
    if (this.state.input === "") return;
    this.handleSend();
  };

  handleSend = () => {
    const { input } = this.state;
    const { currentUser } = this.props;
    this.messageRef
      .add({
        content: input,
        user_id: currentUser.user_id,
        time: new Date()
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

    this.setState({
      input: ""
    });
  };

  handleChatRef = ref => {
    this.setState({ chatRef: ref });
  };

  render() {
    const { classes, user, currentUser } = this.props;
    const { messages, input } = this.state;
    return (
      <>
        <div className={classes.chatContent} ref={this.handleChatRef}>
          {messages.map((message, idx) => {
            let sender;
            let ownMsg = true;
            if (user.user_id === message.user_id) {
              sender = user;
              ownMsg = false;
            } else {
              sender = currentUser;
            }
            return (
              <Message
                key={idx}
                message={message}
                sender={sender}
                ownMsg={ownMsg}
              />
            );
          })}
        </div>
        <Toolbar className={classes.bottomBar} variant="dense">
          <InputBase
            placeholder="type something"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInner
            }}
            value={input}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <IconButton
            color="primary"
            className={classes.sendButton}
            onClick={this.handleSend}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </>
    );
  }
}

const StyledMessageList = injectSheet(styles)(MessageList);

export default StyledMessageList;
