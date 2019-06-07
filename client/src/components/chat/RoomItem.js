import React, { Component } from "react";
import ReactDOM from "react-dom";
import injectSheet from "react-jss";
import Moment from "react-moment";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { grey, red, teal } from "@material-ui/core/colors";

import firebase from "./firebase";
import ChatBox from "./ChatBox";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: grey,
    danger: red
  }
});

const styles = theme => ({
  friendRequest: {
    width: 400
  },
  time: {
    marginRight: 12
  }
});

class RoomItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastMessage: {},
      time: "",
      showBox: false,
      haveMessages: false,
      roomInfo: []
    };
    const { room } = this.props;
    this.db = firebase.firestore();
    this.roomRef = this.db.collection("rooms").doc(room.room_id.toString());
    this.messageRef = this.roomRef.collection("messages");
    this.roomRef.get().then(docSnapshot => {
      if (!docSnapshot.exists) {
        this.roomRef.set({});
      }
    });
  }

  async componentDidMount() {
    this.unsubscribe = this.messageRef
      .orderBy("time", "desc")
      .limit(1)
      .onSnapshot(snapshot => {
        let newMessage = [];
        snapshot.forEach(doc => {
          newMessage = [...newMessage, doc.data()];
        });
        if (newMessage.length) {
          this.setState({
            lastMessage: newMessage[0],
            time: newMessage[0].time.toDate()
          });
        }
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  openChatBox = () => {
    const { currentUser } = this.props;
    const { user, room_id } = this.props.room;
    this.setState({ showBox: true });
    const wrapper = document.createElement("div");
    wrapper.id = `chatroom-${room_id}`;
    wrapper.classList.add("chatroom");
    ReactDOM.render(
      <MuiThemeProvider theme={theme}>
        <ChatBox user={user} currentUser={currentUser} room_id={room_id} />
      </MuiThemeProvider>,
      document.getElementById("chatbox-area").appendChild(wrapper)
    );
  };

  render() {
    const { lastMessage, time } = this.state;
    const { classes, room } = this.props;
    const { user } = room;
    return (
      <>
        <ListItem button onClick={this.openChatBox}>
          <ListItemAvatar>
            <Avatar src={user.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={`${user.first_name} ${user.last_name}`}
            secondary={lastMessage.content}
          />
          <ListItemSecondaryAction>
            <Typography
              component="span"
              variant="body2"
              className={classes.time}
            >
              <Moment fromNow>{time}</Moment>
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </>
    );
  }
}

const StyledItem = injectSheet(styles)(RoomItem);

export default StyledItem;
