import React, { Component } from "react";
import ReactDOM from "react-dom";
import injectSheet from "react-jss";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { AppBar } from "@material-ui/core";

import MessageList from "./MessageList";

const styles = theme => ({
  root: {
    width: 300,
    position: "relative",
    height: 298
  },
  topbar: {
    position: "relative"
  },
  header: {
    position: "relative",
    // boxShadow: theme.shadows["2"],
    padding: [[0, 6, 0, 12]]
  },
  grow: {
    flexGrow: 1
  },
  avatarRoot: {
    width: 30,
    height: 30,
    marginRight: 10,
    boxShadow: theme.shadows["2"]
  }
});

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimized: false,
      show: true
    };
  }

  handleClose = () => {
    const { room_id } = this.props;
    const node = document.getElementById(`chatroom-${room_id}`);
    ReactDOM.unmountComponentAtNode(node);
    node.parentNode.removeChild(node);
  };

  handleMinimize = () => {
    this.setState({ minimized: !this.state.minimized });
  };

  render() {
    const { classes, user, currentUser, room_id } = this.props;
    const { minimized } = this.state;
    return (
      <Collapse in={!minimized} collapsedHeight="48px">
        <Paper square className={classes.root}>
          <AppBar
            color="secondary"
            position="relative"
            classes={{
              root: classes.topbar
            }}
          >
            <Toolbar className={classes.header} variant="dense">
              <Avatar
                src={user.avatar}
                classes={{
                  root: classes.avatarRoot
                }}
              />
              <Typography component="h5" variant="subtitle2" color="inherit">
                {`${user.first_name} ${user.last_name}`}
              </Typography>
              <div className={classes.grow} />
              <IconButton
                color="inherit"
                onClick={this.handleMinimize}
                disableRipple
              >
                {minimized ? (
                  <KeyboardArrowUpIcon fontSize="small" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton color="inherit" onClick={this.handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <MessageList
            user={user}
            currentUser={currentUser}
            room_id={room_id}
          />
        </Paper>
      </Collapse>
    );
  }
}

const StyledChatBox = injectSheet(styles)(ChatBox);

export default StyledChatBox;
