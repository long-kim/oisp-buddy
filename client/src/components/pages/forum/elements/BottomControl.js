import React, { Component } from "react";
import injectSheet from "react-jss";

import Grid from "@material-ui/core/Grid";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  bottomControl: {
    padding: [[0, 30, 20]]
  },
  secondary: {
    color: theme.palette.secondary["400"]
  },
  danger: {
    color: theme.palette.danger["500"]
  },
  modal: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    height: 160,
    top: "calc(50% - 80px)",
    left: `calc(50% - ${theme.spacing.unit * 25}px)`,
    backgroundColor: theme.palette.secondary["800"],
    "&:focus": {
      outline: "none"
    }
  },
  content: {
    color: theme.palette.secondary["300"]
  },
  action: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "flex-start"
  },
  cancel: {
    color: theme.palette.secondary["500"]
  },
  delete: {
    color: theme.palette.danger["300"]
  }
});

class BottomControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: false,
      edit_mode: false,
      showControl: false,
      modal: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="flex-end"
          className={classes.bottomControl}
          spacing={8}
        >
          {!this.props.hidden && this.props.ownPost && (
            <>
              <Grid
                item
                component={Button}
                color="secondary"
                variant="text"
                className={classes.secondary}
                onClick={() => {
                  this.props.edit(true);
                }}
              >
                Edit
              </Grid>
              <Grid
                item
                component={Button}
                color="secondary"
                variant="text"
                className={classes.danger}
                onClick={() => {
                  this.setState({ modal: true });
                }}
              >
                Delete
              </Grid>
            </>
          )}
          {!this.props.hidden && (
            <Grid
              item
              component={Button}
              id="reply-btn"
              color="primary"
              variant="text"
              onClick={() => {
                this.props.reply();
              }}
            >
              reply
            </Grid>
          )}
        </Grid>
        <Modal
          disableBackdropClick
          open={this.state.modal}
          onClose={() => {
            this.setState({ modal: false });
          }}
        >
          <Card className={classes.modal} raised>
            <CardContent>
              <Typography
                component="h5"
                variant="h6"
                color="secondary"
                gutterBottom
                className={classes.content}
              >
                Confirm Delete
              </Typography>
              <Typography
                component="p"
                variant="body1"
                color="secondary"
                className={classes.content}
              >
                Are you sure you want to delete your post? This action cannot be
                reverted!
              </Typography>
            </CardContent>
            <CardActions
              classes={{
                root: classes.action
              }}
            >
              <Button variant="text" className={classes.delete}>
                Delete
              </Button>
              <Button
                variant="text"
                color="secondary"
                className={classes.cancel}
                onClick={() => {
                  this.setState({ modal: false });
                }}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Modal>
      </>
    );
  }
}

const StyledControl = injectSheet(styles)(BottomControl);

export default StyledControl;
