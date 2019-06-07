import React, { Component } from "react";
import injectSheet from "react-jss";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Axios from "axios";

import List from "@material-ui/core/List";
import Badge from "@material-ui/core/Badge";

import RequestItem from "./RequestItem";

import UserContext from "../UserContext";

const styles = theme => ({
  root: {
    marginRight: 5
  },
  friendRequest: {
    width: 400
  },
  title: {
    padding: [[8, 16, 4]]
  },
  emptyList: {
    padding: [[0, 16, 8]],
    color: theme.palette.secondary["600"]
  }
});

class FriendRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      active: false,
      pending: []
    };
  }

  async componentDidMount() {
    const response = await Axios.get(`/api/users/requests`);
    this.setState({
      pending: response.data
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
    const { anchorEl, active, pending } = this.state;
    const open = Boolean(anchorEl);
    return (
      <>
        <IconButton
          color={active ? "primary" : "inherit"}
          className={classes.root}
          onClick={this.handleClick}
        >
          <Badge color="error" badgeContent={pending.length}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popover
          id="friend-request"
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          onClose={this.handleClose}
          classes={{
            paper: classes.friendRequest
          }}
        >
          <Typography component="h3" variant="h6" className={classes.title}>
            Friend requests
          </Typography>
          <List className={classes.friendList}>
            {pending.length === 0 && (
              <Typography
                component="p"
                variant="body1"
                className={classes.emptyList}
              >
                Nothing to show... yet!
              </Typography>
            )}
            {pending.length > 0 &&
              pending.map((item, idx) => {
                return <RequestItem key={idx} user={item} />;
              })}
          </List>
        </Popover>
      </>
    );
  }
}

const StyledFriendRequest = injectSheet(styles)(FriendRequest);

export default StyledFriendRequest;
