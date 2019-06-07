import React, { Component } from "react";
import injectSheet from "react-jss";
import Axios from "axios";
import { Link } from "react-router-dom";
import Color from "color";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";

import defaultAvatar from "../../../assets/images/avatar-default.svg";

const styles = theme => ({
  root: {
    position: "absolute",
    width: 290,
    top: 90,
    left: 100
  },
  media: {
    objectFit: "cover",
    height: 400,
    width: "100%"
  },
  edit: {
    position: "absolute",
    top: 350,
    right: 5,
    color: theme.palette.secondary["200"],
    "&:hover": {
      backgroundColor: Color(theme.palette.secondary["400"])
        .fade(0.6)
        .toString()
    }
  }
});

class Polaroid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleAvatarChange = async e => {
    const { user, edit } = this.props;
    e.preventDefault();
    const data = new FormData(e.target);
    await Axios.patch(`/api/users/edit/${user.user_id}`, {
      avatar: data.get("avatar")
    });
    edit();
    this.setState({ open: false });
  };

  render() {
    const { classes, currentUser } = this.props;
    const { user_id, friends, threads, avatar } = this.props.user;
    return (
      <>
        <Card raised square className={classes.root}>
          <CardMedia
            component="img"
            alt="User's avatar"
            className={classes.media}
            height="400"
            src={avatar !== "" ? avatar : defaultAvatar}
          />
          {currentUser !== null && currentUser.user_id === user_id && (
            <Grid item component={Tooltip} title="Edit Avatar">
              <IconButton
                color="secondary"
                size="small"
                classes={{
                  colorSecondary: classes.edit
                }}
                onClick={() => this.setState({ open: true })}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Grid>
          )}
          <Grid
            container
            component={CardContent}
            className={classes.content}
            direction="column"
          >
            <Typography component="h3" variant="h6">
              ABOUT
            </Typography>
            <Typography component="p" variant="body1">
              {this.props.user.about}
            </Typography>
            <Typography
              component={Link}
              to={`/profile/${user_id}/info`}
              variant="caption"
              gutterBottom
              style={{
                marginBottom: 10
              }}
            >
              Read more
            </Typography>
            <Divider variant="fullWidth" />
            <Grid
              container
              justify="space-between"
              direction="row"
              style={{ marginTop: 10 }}
            >
              <Typography
                component={Link}
                to={`/profile/${user_id}/friends`}
                variant="button"
              >
                Friends
              </Typography>
              <Typography component="span" variant="button">
                {friends.length}
              </Typography>
            </Grid>
            <Grid
              container
              justify="space-between"
              direction="row"
              style={{ marginTop: 10 }}
            >
              <Typography
                component={Link}
                to={`/forum/index`}
                variant="button"
              >
                Threads
              </Typography>
              <Typography component="span" variant="button">
                {threads.length}
              </Typography>
            </Grid>
            <Grid
              container
              justify="space-between"
              direction="row"
              style={{ marginTop: 10 }}
            >
              <Typography
                component={Link}
                to={`/profile/${user_id}/achievements`}
                variant="button"
              >
                Achievements
              </Typography>
              <Typography component="span" variant="button">
                0
              </Typography>
            </Grid>
          </Grid>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <form id="update-avatar" onSubmit={this.handleAvatarChange}>
            <DialogTitle>Edit avatar</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.contentText}>
                Enter URL to your avatar. Try to find a beautiful one!
              </DialogContentText>
              <TextField
                label="URL to your image"
                color="primary"
                helperText="Recommend size: 1080px x 300px"
                name="avatar"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="text"
                onClick={() => this.setState({ open: false })}
              >
                Cancel
              </Button>
              <Button color="primary" variant="text" type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  }
}

const StyledPolaroid = injectSheet(styles)(Polaroid);

export default StyledPolaroid;
