import React, { Component } from "react";
import injectSheet from "react-jss";
import Axios from "axios";
import Color from "color";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

import placeholder from "../../../assets/ui-elements/placeholder.png";

const styles = theme => ({
  root: {
    height: 300,
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: [["50%", "67%"]],
    "&::before": {
      position: "absolute",
      width: "100%",
      height: "100%",
      background: `linear-gradient(0deg, ${Color("black")
        .fade(0.4)
        .toString()}, ${Color("black")
        .fade(0.9)
        .toString()})`,
      content: '" "'
    }
  },
  cover: {
    objectFit: "cover",
    objectPosition: [["50%", "67%"]],
    width: "100%",
    height: 300,
    filter: "brightness(0.6)"
  },
  userInfo: {
    position: "absolute",
    left: 420,
    bottom: 10
  },
  name: {
    color: "#fff",
    marginBottom: 5
  },
  edit: {
    position: "absolute",
    bottom: 10,
    right: 10,
    color: theme.palette.secondary["200"],
    "&:hover": {
      backgroundColor: Color(theme.palette.secondary["400"])
        .fade(0.6)
        .toString()
    }
  },
  contentText: {
    marginBottom: 5
  }
});

class Cover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleCoverChange = async e => {
    const { user, edit } = this.props;
    e.preventDefault();
    const data = new FormData(e.target);
    await Axios.patch(`/api/users/edit/${user.user_id}`, {
      cover: data.get("cover")
    });
    edit();
    this.setState({ open: false });
  };

  render() {
    const { classes, user, currentUser } = this.props;
    const cover = user.cover !== "" ? user.cover : placeholder;
    return (
      <>
        <Grid
          container
          className={classes.root}
          style={{
            backgroundImage: `url(${cover})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat"
          }}
        >
          <Grid item className={classes.userInfo}>
            <Typography component="h1" variant="h3" className={classes.name}>
              {user.name}
            </Typography>
            <Typography
              component="h2"
              variant="subtitle2"
              className={classes.name}
              gutterBottom
            >
              Class of {user.year} - {user.dept}
            </Typography>
          </Grid>
          {currentUser !== null && currentUser.user_id === user.user_id && (
            <Grid item component={Tooltip} title="Edit cover image">
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
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <form id="update-cover" onSubmit={this.handleCoverChange}>
            <DialogTitle>Edit cover image</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.contentText}>
                Enter URL to your cover image. Try to find a beautiful one!
              </DialogContentText>
              <TextField
                label="URL to your image"
                color="primary"
                helperText="Recommend size: 1080px x 300px"
                name="cover"
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

const StyledCover = injectSheet(styles)(Cover);

export default StyledCover;
