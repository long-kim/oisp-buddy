import React, { Component } from "react";
import injectSheet from "react-jss";
import Axios from "axios";
import _ from "lodash";
import classNames from "classnames";

import UserContext from "../../../UserContext";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import Header from "../elements/Header";
import Post from "./Post";
import BottomNav from "../elements/BottomNav";
import ReplyForm from "../elements/ReplyForm";

import cover from "../../../../assets/images/forum/default.jpg";

const styles = theme => ({
  singleThread: {
    maxWidth: "1000px"
  },
  postWrapper: {
    minHeight: "calc(100vh - 264px)"
  },
  title: {
    marginBottom: theme.spacing.unit * 3
  },
  loading: {
    backgroundColor: "#fff",
    height: "calc(100vh - 328px)"
  },
  threadReply: {
    backgroundColor: theme.palette.secondary["800"],
    padding: [[10, 0, 20]],
    bottom: 63,
    zIndex: 3,
    "&.sticky": {
      position: "sticky"
    }
  },
  leftCol: {
    width: 180,
    height: "100%",
    flex: "none"
  },
  avatar: {
    width: 80,
    height: 80,
    marginRight: 10,
    border: [[3, "solid", "#fff"]],
    borderRadius: "50%",
    boxShadow: theme.shadows[2]
  }
});

class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      score: 0,
      isSubbed: false,
      voted: 0,
      title: "",
      date: new Date(),
      currentPage: 1,
      totalPages: 0,
      posts: [],
      votes: [],
      headerResize: false,
      newPost: false,
      deletePost: false,
      editPost: false,
      isLoading: true,
      sticky: false
    };
  }

  async componentDidMount() {
    this.getPosts();
    this.setState({ isLoading: false });
  }

  async componentDidUpdate(_prevProps, prevState) {
    if (this.state.currentPage !== prevState.currentPage) {
      this.getPosts();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    if (this.state.newPost === true) {
      this.getPosts();
      this.setState({ newPost: false });
    }
    if (this.state.editPost === true) {
      this.getPosts();
      this.setState({ editPost: false });
    }
  }

  handlePageChange = newPage => {
    this.setState({
      isLoading: true,
      currentPage: newPage
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ currentPage: this.state.totalPages });
    const data = {
      thread_id: this.props.match.params.threadId,
      content: document.getElementsByName("content")[0].value
    };
    if (data.content !== "") {
      await Axios.post("/api/posts/new", data);
      this.setState({ newPost: true });
    }
  };

  getPosts = async () => {
    let thread_id = this.props.match.params.threadId;
    const response = await Axios.get(
      `/api/threads/view/${thread_id}?page=${this.state.currentPage}`
    );
    this.setState({
      ...response.data,
      totalPages: Math.ceil(response.data.posts_count / 10),
      isLoading: false
    });
  };

  toggleSticky = value => {
    this.setState({ sticky: value });
  };

  handleEditPost = () => {
    this.setState({ editPost: true });
  };

  handleSubscribe = async () => {
    const sub = this.state.isSubbed;
    const thread_id = this.props.match.params.threadId;
    if (!sub) {
      await Axios.get(`/api/threads/${thread_id}/subscribe`);
      this.setState({ isSubbed: true });
    } else {
      await Axios.get(`/api/threads/${thread_id}/unsubscribe`);
      this.setState({ isSubbed: false });
    }
  };

  handleEditorRef = vm => {
    this.setState({ vm: vm });
  };

  render() {
    const { classes } = this.props;
    return (
      <UserContext.Consumer>
        {({ currentUser, authorize }) => (
          <>
            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.singleThread}
            >
              <Header
                cover={cover}
                content={_.truncate(this.state.title, { length: 32 })}
                tooltip={this.state.title}
              />
              <Grid
                container
                alignItems="center"
                direction="column"
                className={classes.postWrapper}
              >
                {this.state.isLoading && (
                  <Grid
                    container
                    className={classes.loading}
                    alignItems="center"
                    justify="center"
                    direction="column"
                  >
                    <Grid item>
                      <CircularProgress color="primary" />
                    </Grid>
                    <Grid item>
                      <Typography component="h5" variant="subtitle2">
                        Hang in there
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {!this.state.isLoading &&
                  this.state.posts.map((post, idx) => {
                    return (
                      <Post
                        key={post.post_id}
                        parent_id={post.parent_id}
                        post_id={post.post_id}
                        content={post.content}
                        score={post.score}
                        author={post.posted_by}
                        timestamp={post.timestamp}
                        no={idx + (this.state.currentPage - 1) * 10}
                        delete={this.handleDeletePost}
                        edit={this.handleEditPost}
                        // voted={this.getVote(post.post_id)}
                        parent_score={
                          post.content_of !== null ? this.passedProps : null
                        }
                        ownPost={post.posted_by.user_id === currentUser.user_id}
                        vm={this.state.vm}
                      />
                    );
                  })}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              component="form"
              justify="center"
              id="thread-reply"
              onSubmit={this.handleSubmit}
              className={classNames(classes.threadReply, {
                sticky: this.state.sticky
              })}
            >
              <Grid container justify="flex-end" className={classes.leftCol}>
                <Avatar
                  className={classes.avatar}
                  src={currentUser === null ? "" : currentUser.avatar}
                />
              </Grid>
              <ReplyForm handleEditorRef={this.handleEditorRef} />
            </Grid>
            <BottomNav
              totalPosts={this.state.posts_count}
              change={this.handlePageChange}
              sticky={this.toggleSticky}
              sub={this.state.isSubbed}
              subscribe={this.handleSubscribe}
            />
          </>
        )}
      </UserContext.Consumer>
    );
  }
}

const StyledThread = injectSheet(styles)(Thread);

Thread.contextType = UserContext;

export default StyledThread;
