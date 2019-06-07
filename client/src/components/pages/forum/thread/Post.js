import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import Grid from "@material-ui/core/Grid";

import UserInfo from "../elements/UserInfo";
import PostBody from "../elements/PostBody";
import BottomControl from "../elements/BottomControl";

const styles = theme => ({
  post: {
    padding: 0,
    marginBottom: 15
  },
  postBody: {
    width: "calc(100% - 180px)",
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    boxShadow: "-1px 0 2px rgba(0, 0, 0, 0.16)"
  }
});

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      voted: 0,
      posted_by: {},
      modal_is_open: false,
      popup_is_open: false,
      current_user: false,
      edit_mode: false,
      avatar: `${this.props.author.avatar}`,
      showControl: false,
      ownPost: false
    };
  }

  focusReplyForm = () => {
    this.setState({ popup_is_open: false });
    const quote = `[quote author_id=${this.props.author} name="${
      this.props.author.name
    }" parent_id=${this.props.parent_id} post_id=${this.props.post_id}]${
      this.props.content
    }[/quote]`;
    document.getElementById("reply-btn").click();
    this.props.vm.value = quote;
    this.props.vm.focus();
  };

  editMode = state => {
    this.setState({ edit_mode: state });
  };

  handleEditPost = async e => {
    e.preventDefault();
    const post = document.getElementById(`edit-form-${this.props.post_id}`);
    const text = post.getElementsByTagName("textarea")[0];
    const data = { content: text.value };
    await Axios.patch(`/api/posts/edit/${this.props.post_id}`, data);
    this.setState({ edit_mode: false });
    this.props.edit();
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="row" className={classes.post}>
        <UserInfo author={this.props.author} />
        <Grid
          container
          component="form"
          id={`edit-form-${this.props.post_id}`}
          onSubmit={this.handleEditPost}
          direction="column"
          className={classes.postBody}
        >
          <PostBody
            timestamp={this.props.timestamp}
            content={this.props.content}
            edit={this.state.edit_mode}
            editMode={this.editMode}
          />
          <BottomControl
            reply={this.focusReplyForm}
            edit={this.editMode}
            hidden={this.state.edit_mode}
            ownPost={this.props.ownPost}
          />
        </Grid>
      </Grid>
    );
  }
}

const StyledPost = injectSheet(styles)(Post);

export default StyledPost;
