import React, { Component } from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import btnBackground from "../../../../assets/ui-elements/button.svg";

const styles = theme => ({
  infoPanel: {
    width: 180,
    flex: "none",
    backgroundColor: theme.palette.primary["700"]
  },
  infoMain: {
    height: 180,
    width: 180,
    paddingTop: 18,
    backgroundImage: "linear-gradient(180deg ,transparent, rgba(0, 0, 0, 0.2))",
    position: "relative",
    "&::before": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: 180,
      backgroundImage: `url(${btnBackground})`,
      backgroundSize: 300,
      opacity: 0.5,
      content: '" "'
    }
  },
  userAvatar: {
    width: 120,
    height: 120,
    border: [[5, "solid", "#fff"]],
    backgroundSize: "cover",
    zIndex: 2,
    boxShadow: theme.shadows[2]
  },
  username: {
    padding: [[2, 10]],
    zIndex: 2,
    whiteSpace: "nowrap",
    textShadow: "0 1px 3px rgba(0, 0, 0, 0.75)",
    "& a": {
      color: "#fff",
      textDecoration: "none"
    }
  },
  infoExtra: {
    backgroundColor: "hsla(0, 0%, 100%, 0.9)",
    flex: [[1, 0, "auto"]],
    padding: 10
  },
  badge: {
    boxShadow: theme.shadows[2]
  },
  extraTop: {
    marginBottom: 10
  },
  extraBottom: {
    fontSize: 12
  }
});

class Userinfo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="column" className={classes.infoPanel}>
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.infoMain}
        >
          <Grid item>
            <Avatar
              component={Link}
              to={`profile/${this.props.author.user_id}`}
              src={this.props.author.avatar}
              className={classes.userAvatar}
            />
          </Grid>
          <Grid item className={classes.username}>
            <Typography
              component={Link}
              to={`profile/${this.props.author.user_id}`}
              variant="h6"
            >
              {this.props.author.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="space-between"
          className={classes.infoExtra}
        >
          <Grid item className={classes.extraTop}>
            <Chip
              label={<b>Senior</b>}
              color="primary"
              className={classes.badge}
            />
          </Grid>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography
                component="h5"
                variant="subtitle2"
                className={classes.extraBottom}
              >
                Joined April 2019
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                component="h5"
                variant="subtitle2"
                className={classes.extraBottom}
              >
                10 posts
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const StyledUserInfo = injectSheet(styles)(Userinfo);

export default StyledUserInfo;
