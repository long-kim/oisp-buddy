import React, { Component } from "react";
import injectSheet from "react-jss";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  author: {
    width: "calc(200px + 5vmin)",
    height: "calc(270px + 5vmin)",
    padding: 20,
    [theme.breakpoints.down("xs")]: {
      padding: 10,
      width: "calc(170px + 5vmin)",
      height: "calc(270px + 5vmin)"
    }
  },
  authorInner: {
    height: "100%"
  },
  avatar: {
    width: "calc(140px + 5vmin)",
    height: "calc(140px + 5vmin)",
    borderRadius: "50%",
    boxShadow: theme.shadows[2],
    [theme.breakpoints.down("lg")]: {
      width: 100,
      height: 100
    }
  }
});

class AuthorCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item>
        <Paper elevation={2} className={classes.author}>
          <Grid
            className={classes.authorInner}
            container
            alignItems="center"
            justify="space-around"
            direction="column"
            spacing={8}
          >
            <Grid item>
              <Avatar src={this.props.avatar} className={classes.avatar} />
            </Grid>
            <Grid item>
              <Typography component="h4" variant="h6">
                {this.props.name}
              </Typography>
              <Typography component="span" variant="body1">
                {this.props.title}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

const StyledCard = injectSheet(styles)(AuthorCard);

export default StyledCard;
