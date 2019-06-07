import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import injectSheet from "react-jss";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    padding: [[10, 5, 10, 15]],
    borderBottom: [[1, "solid", theme.palette.secondary["300"]]],
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary["200"]
    }
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 20,
    boxShadow: theme.shadows[2]
  },
  content: {
    width: "calc(100% - 80px)"
  }
});

class ThreadItem extends Component {
  render() {
    const { thread, avatar, classes } = this.props;
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        component={Link}
        to={`/forum/thread/${thread.thread_id}`}
        className={classes.root}
      >
        <Grid item component={Avatar} src={avatar} className={classes.avatar} />
        <Grid
          container
          direction="column"
          justify="space-around"
          className={classes.content}
        >
          <Grid item>
            <Typography component="h4" variant="h6" color="textPrimary">
              {thread.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              component={Moment}
              format="MMMM DD, YYYY"
              variant="overline"
              color="textSecondary"
            >
              {thread.createdAt}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const StyledThreadItem = injectSheet(styles)(ThreadItem);

export default StyledThreadItem;
