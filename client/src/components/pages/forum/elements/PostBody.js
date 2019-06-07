import React, { Component } from "react";
import injectSheet from "react-jss";

import Moment from "react-moment";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import btnBackground from "../../../../assets/ui-elements/button.svg";
import BBParser from "./BBParser";
import ReplyForm from "./ReplyForm";

const styles = theme => ({
  timestamp: {
    padding: [[20, 30, 0]],
    width: "100%",
    "& span": {
      color: theme.palette.secondary["600"]
    }
  },
  infoPanel: {
    width: 180,
    flex: "none",
    backgroundColor: theme.palette.primary["700"]
  },
  postContent: {
    padding: [[15, 30, 0]],
    flex: 1,
    textAlign: "justify"
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
  }
});

class PostBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: false,
      edit_mode: false,
      showControl: false,
      ownPost: false,
      vm: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.edit_mode !== prevProps.edit) {
      this.setState({ edit_mode: prevProps.edit });
    }
  }

  handleEditorRef = vm => {
    this.setState({ vm: vm });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          className={classes.topPart}
        >
          <Grid item className={classes.timestamp}>
            <Typography component="span" variant="caption">
              posted <Moment fromNow>{this.props.timestamp}</Moment>
            </Typography>
          </Grid>
        </Grid>
        <Grid item className={classes.postContent}>
          {!this.props.edit && <BBParser input={this.props.content} />}
          {this.props.edit && (
            <ReplyForm
              handleEditorRef={this.handleEditorRef}
              value={this.props.content}
              editMode={this.props.editMode}
              editPost
            />
          )}
        </Grid>
      </>
    );
  }
}

const StyledPostBody = injectSheet(styles)(PostBody);

export default StyledPostBody;
