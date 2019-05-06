import React, { Component } from "react";
import Create from "./Create";
import ReplyForm from "./elements/ReplyForm";
import Index from "./Index";
import Container from "react-bootstrap/Container";
import Post from "./elements/Post";
import Axios from "axios";
import Moment from "react-moment";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import cover from "assets/img/thread-default-cover.jpg";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import $ from "jquery";

class Thread extends Component {
  static Create = Create;
  static Reply = ReplyForm;
  static Index = Index;
  passedProps = this.props.location.state;

  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      score: this.passedProps.score,
      subscribed: this.passedProps.subscribed,
      voted: this.passedProps.voted,
      title: "",
      date: new Date(),
      currentPage: 1,
      totalPages: 0,
      count: 0,
      posts: [],
      votes: [],
      headerResize: false,
      newPost: false,
      deletePost: false,
      editPost: false
    };
  }

  componentWillMount() {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
  }

  componentDidUpdate(prevProps, prevState) {
    let thread_id = this.props.match.params.threadId;
    if (this.state.currentPage !== prevState.currentPage) {
      Axios.get(
        `/api/threads/view/${thread_id}/posts?page=${this.state.currentPage}`
      )
        .then(res => {
          const posts = res.data.posts;
          this.setState({ posts: posts });
          return Promise.resolve();
        })
        .then(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        });
    }
    if (this.state.newPost === true) {
      Axios.get(
        `/api/threads/view/${thread_id}/posts?page=${this.state.currentPage}`
      ).then(res => {
        const posts = res.data.posts;
        this.setState({ posts: posts, newPost: false });
      });
    }
    if (this.state.editPost === true) {
      Axios.get(
        `/api/threads/view/${thread_id}/posts?page=${this.state.currentPage}`
      ).then(res => {
        const posts = res.data.posts;
        this.setState({ posts: posts, editPost: false });
      });
    }
    if (this.state.deletePost === true) {
      Axios.get(
        `/api/threads/view/${thread_id}/posts?page=${this.state.currentPage}`
      ).then(res => {
        const posts = res.data.posts;
        this.setState({ posts: posts, deletePost: false });
      });
    }
  }

  componentDidMount() {
    let thread_id = this.props.match.params.threadId;
    Axios.get(`/api/threads/view/${thread_id}`)
      .then(res => {
        this.setState({
          title: res.data.title,
          score: res.data.score,
          date: res.data.createdAt
        });
        return Promise.resolve();
      })
      .then(() => {
        return Axios.get(`/api/threads/view/${thread_id}/posts/count`);
      })
      .then(res => {
        this.setState({
          count: res.data.count,
          totalPages: Math.ceil(res.data.count / 10)
        });
        return Promise.resolve();
      })
      .then(() => {
        return Axios.get(`/api/threads/view/${thread_id}/posts?page=1`);
      })
      .then(res => {
        const posts = res.data.posts;
        this.setState({ posts: posts });
        return Promise.resolve();
      })
      .then(() => {
        return Axios.get("/api/users/votes/post");
      })
      .then(res => {
        this.setState({ votes: res.data });
      });

    // window.addEventListener("scroll", this.handleScroll);
    $(".reply-btn").on("click", function() {
      $(this).toggleClass("active");
      $("#thread-reply").toggleClass("sticky");
    });
    $(".bookmark-btn").on("click", this.handleSubscribe);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    const shrinkOn = document.getElementById("thread-header").offsetHeight;
    const smallHeader = document.getElementById("sticky-header");
    if (distanceY > shrinkOn) {
      smallHeader.classList.add("show");
    } else {
      smallHeader.classList.remove("show");
    }
  };

  handleSubscribe = () => {
    $(".bookmark-btn").toggleClass("active");
    const sub = this.state.subscribed;
    const thread_id = this.props.match.params.threadId;
    if (!sub) {
      this.setState({ subscribed: true });
      Axios.get(`/api/threads/${thread_id}/subscribe`);
    } else {
      this.setState({ subscribed: false });
      Axios.get(`/api/threads/${thread_id}/unsubscribe`);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const data = {
      thread_id: this.props.match.params.threadId,
      content: document.getElementsByName("content")[0].value
    };
    if (data.content !== "") {
      let response = await Axios.post("/api/posts/new", data);
      this.setState({ newPost: true });
      document.getElementsByName("content")[0].value = "";
    }
  };

  handleDeletePost = () => {
    this.setState({ deletePost: true });
  };

  handleEditPost = () => {
    this.setState({ editPost: true });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  updateScore = val => {
    const score = this.state.score;
    let voted = this.state.voted;
    if (val === voted) {
      val = -voted;
    } else if (val === -voted) {
      val -= voted;
    }
    this.setState({ score: score + val });
    this.setState({ voted: voted + val });
  };

  getVote = post_id => {
    let result = 0;
    for (let vote_obj of this.state.votes) {
      if (vote_obj.post_id === post_id) {
        result = vote_obj.voted;
      }
    }
    return result;
  };

  render() {
    return (
      <div className="SingleThread">
        <Container className="single-thread">
          <div
            className="forum-header"
            style={{ backgroundImage: `url(${cover})` }}
          >
            <div className="title-wrapper">
              <h1 className="title">{this.state.title}</h1>
              <div className="post-count-wrapper">
                <div className="post-count">
                  <div className="inner-wrapper">
                    Total Posts
                    <span>{this.state.count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-wrapper sticky-header" id="sticky-header">
            <h3 className="title mr-auto">{this.state.title}</h3>
            <div className="menu-expand">
              <i className="fa fa-ellipsis-h" />
            </div>
          </div>
          {/* <div id="thread-header" className="card-wrapper header">
          <div className="control-group score">
            <div className="control" onClick={this.updateScore.bind(this, 1)}>
              <i
                className="fa fa-angle-up"
                style={
                  this.state.voted === 1
                    ? {
                        color: "#777777",
                        fontWeight: "bold"
                      }
                    : {}
                }
              />
            </div>
            <span className="score">{this.state.score}</span>
            <div className="control" onClick={this.updateScore.bind(this, -1)}>
              <i
                className="fa fa-angle-down"
                style={
                  this.state.voted === -1
                    ? {
                        color: "#777777",
                        fontWeight: "bold"
                      }
                    : {}
                }
              />
            </div>
          </div>
          <div className="content">
            <h3 className="title">{this.state.title}</h3>
            <p className="subtitle">
              <Moment format="MMMM DD, YYYY">{this.state.date}</Moment> -{" "}
              {this.state.count} posts
            </p>
            <div className="topics-wrapper">
              {this.props.location.state.topics.map((topic, idx) => {
                return (
                  <Link className="topic" to={`?topic=${topic.id}`} key={idx}>
                    {topic.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <Pagination
            totalItemsCount={this.state.count}
            onChange={this.handlePageChange}
            activePage={this.state.currentPage}
            prevPageText={`\uf104`}
            nextPageText={`\uf105`}
            itemClassNext="next"
            itemClassPrev="prev"
            itemClassFirst="first"
            itemClassLast="last"
          />
        </div> */}
          {this.state.posts.map((post, idx) => {
            return (
              <Post
                key={post.post_id}
                parent_id={post.parent_id}
                post_id={post.post_id}
                content={post.content}
                score={post.score}
                author={post.posted_by}
                author_info={post.User}
                created={post.createdAt}
                no={idx + (this.state.currentPage - 1) * 10}
                delete={this.handleDeletePost}
                edit={this.handleEditPost}
                voted={this.getVote(post.post_id)}
                parent_score={
                  post.content_of !== null ? this.passedProps : null
                }
              />
            );
          })}
        </Container>
        <form id="thread-reply" onSubmit={this.handleSubmit}>
          <div className="form-inner">
            <div className="info-panel">
              <img src={`${this.state.user.avatar}`} />
            </div>
            <ReplyForm />
          </div>
        </form>
        <div className="footer-text">
          You can upload image to a public hosting website. We recommend&nbsp;
          <a href="https://imgur.com/">imgur</a>.<br />
          Learn BBCode <a href="https://www.bbcode.org/reference.php">here</a>.
        </div>
        <div className="btm-control">
          <Pagination
            totalItemsCount={this.state.count}
            onChange={this.handlePageChange}
            activePage={this.state.currentPage}
            prevPageText={`\uf104`}
            nextPageText={`\uf105`}
            itemClassNext="next"
            itemClassPrev="prev"
            itemClassFirst="first"
            itemClassLast="last"
          />
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Bookmark this thread</Tooltip>}
          >
            <Button
              type="button"
              variant="secondary"
              className={`bookmark-btn ${
                this.passedProps.subscribed ? "active" : ""
              }`}
            >
              <i className="fas fa-fw fa-bookmark" />
            </Button>
          </OverlayTrigger>
          <Button
            type="button"
            variant="secondary"
            className="reply-btn"
            onClick={this.openReply}
          >
            <i className="fas fa-fw fa-comment" />
            &nbsp; Reply
          </Button>
        </div>
      </div>
    );
  }
}

export default Thread;
