import React, { Component } from "react";
import injectSheet from "react-jss";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FriendItem from "./FriendItem";

const styles = theme => ({
  root: {
    width: "100%",
    marginLeft: 40
  },
  emptyList: {
    padding: [[10, 5, 10, 15]],
    color: theme.palette.secondary["600"]
  }
});

class FriendList extends Component {
  render() {
    const { classes, user } = this.props;
    const { friends, avatar } = user;
    return (
      <Grid container wrap="wrap" className={classes.root}>
        {friends.length === 0 && (
          <Typography
            component="p"
            variant="body2"
            className={classes.emptyList}
          >
            Go and make some friends!
          </Typography>
        )}
        {friends.map((friend, idx) => {
          return <FriendItem key={idx} friend={friend} />;
        })}
      </Grid>
    );
  }
}

const StyledFriendList = injectSheet(styles)(FriendList);

export default StyledFriendList;
