import React, { Component } from "react";
import Axios from "axios";
import _ from "lodash";
import injectSheet from "react-jss";

import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Portal from "@material-ui/core/Portal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons/faFacebookMessenger";

import RoomItem from "./RoomItem";

import UserContext from "../UserContext";
import { Button, Grid } from "@material-ui/core";

const styles = theme => ({
  icon: {
    width: 48,
    marginRight: 5
  },
  chatRoot: {
    width: 400
  },
  title: {
    padding: [[8, 16, 4]]
  },
  emptyList: {
    padding: [[4, 16]],
    color: theme.palette.secondary["600"]
  }
});

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      active: false,
      user: {
        user_id: 0,
        name: "",
        avatar: ""
      },
      rooms: []
    };
  }

  async componentDidMount() {
    const response = await Axios.get("/api/chat");
    console.log(response.data);
    this.setState({
      rooms: response.data
    });
  }

  handleClick = event => {
    const { currentTarget } = event;
    this.setState({
      anchorEl: currentTarget,
      active: true
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      active: false
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, active, rooms } = this.state;
    const open = Boolean(anchorEl);
    return (
      <UserContext.Consumer>
        {({ currentUser }) => (
          <>
            <IconButton
              color="inherit"
              className={classes.icon}
              color={active ? "primary" : "inherit"}
              onClick={this.handleClick}
            >
              <FontAwesomeIcon icon={faFacebookMessenger} size="sm" />
            </IconButton>
            <Popover
              id="chat"
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              onClose={this.handleClose}
              classes={{
                paper: classes.chatRoot
              }}
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.title}
              >
                <Typography component="h3" variant="h6">
                  Chat
                </Typography>
                <Button variant="text" color="primary">
                  New Message
                </Button>
              </Grid>
              {rooms.length === 0 && (
                <Typography component="p" variant="body2" className={classes.emptyList}>
                  Nothing to show ...yet!
                </Typography>
              )}
              <List className={classes.friendList}>
                {rooms.map((item, idx) => {
                  return (
                    <RoomItem key={idx} room={item} currentUser={currentUser} />
                  );
                })}
              </List>
            </Popover>
          </>
        )}
      </UserContext.Consumer>
    );
  }
}

const StyledChat = injectSheet(styles)(Chat);

export default StyledChat;
