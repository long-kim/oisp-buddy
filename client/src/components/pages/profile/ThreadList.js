import React, { Component } from "react";
import injectSheet from "react-jss";

import Grid from "@material-ui/core/Grid";
import ThreadItem from "./ThreadItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: 700
  },
  emptyList: {
    padding: [[10, 5, 10, 15]],
    color: theme.palette.secondary["600"]
  }
});

class ThreadList extends Component {
  render() {
    const { classes, user } = this.props;
    const { threads, avatar } = user;
    return (
      <Grid container className={classes.root}>
        {threads.length === 0 && (
          <Typography
            component="p"
            variant="body2"
            className={classes.emptyList}
          >
            Nothing to show ...yet!
          </Typography>
        )}
        {threads.map((thread, idx) => {
          return <ThreadItem key={idx} avatar={avatar} thread={thread} />;
        })}
      </Grid>
    );
  }
}

const StyledThreadList = injectSheet(styles)(ThreadList);

export default StyledThreadList;
