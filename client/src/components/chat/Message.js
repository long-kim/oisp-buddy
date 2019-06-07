import React, { Component } from "react";
import injectSheet from "react-jss";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    margin: [[10, 0]]
  },
  senderAvatar: {
    width: 30,
    height: 30,
    margin: [[0, 10]]
  },
  msgContent: {
    padding: [[5, 10]],
    backgroundColor: theme.palette.secondary["200"]
  }
});

class Message extends Component {
  render() {
    const { classes, sender, message, ownMsg } = this.props;
    return (
      <Grid
        container
        alignItems="flex-start"
        direction={ownMsg ? "row-reverse" : "row"}
        className={classes.root}
      >
        <Grid item>
          <Avatar
            src={sender.avatar}
            classes={{
              root: classes.senderAvatar
            }}
          />
        </Grid>
        <Grid item>
          <Paper className={classes.msgContent}>
            <Typography component="p" variant="body2">
              {message.content}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const StyledMessage = injectSheet(styles)(Message);

export default StyledMessage;
