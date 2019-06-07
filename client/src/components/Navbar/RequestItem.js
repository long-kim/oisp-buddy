import React, { Component } from "react";
import injectSheet from "react-jss";
import Axios from "axios";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import UserContext from "../UserContext";

const styles = theme => ({
  friendRequest: {
    width: 400
  }
});

class RequestItem extends Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

  addFriend = async (status, user1, user2) => {
    await Axios.post(`/api/users/edit/friend`, {
      status: status,
      user1: user1,
      user2: user2
    });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <UserContext.Consumer>
        {({ currentUser }) => (
          <ListItem
            button
            component={this.renderLink}
            to={`/profile/${user.user_id}`}
          >
            <ListItemAvatar>
              <Avatar src={user.avatar} />
            </ListItemAvatar>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
            <ListItemSecondaryAction>
              <Tooltip title="Decline">
                <IconButton color="default">
                  <CloseIcon fontFamily="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Accept">
                <IconButton
                  color="primary"
                  onClick={() =>
                    this.addFriend(0, user.user_id, currentUser.user_id)
                  }
                >
                  <CheckIcon fontFamily="small" />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </UserContext.Consumer>
    );
  }
}

const StyledItem = injectSheet(styles)(RequestItem);

export default StyledItem;
