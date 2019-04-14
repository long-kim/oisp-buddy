import React, { Component } from "react";
import Create from "./Create";
import ReplyForm from "./elements/ReplyForm";
import Index from "./Index";
import Container from "react-bootstrap/Container";
import Post from "./elements/Post";
import Axios from "axios";
import Moment from "react-moment";

class Thread extends Component {
  static Create = Create;
  static Reply = ReplyForm;
  static Index = Index;

  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score | 0,
      subscribed: false,
      voted: 0,
      title: "",
      date: new Date(),
      posts: [],
      headerResize: false,
      newPost: false
    };
  }

  componentDidUpdate() {
    let thread_id = this.props.match.params.threadId;
    Axios.get(`/api/threads/view/${thread_id}/posts`).then(res => {
      const posts = res.data.posts;
      if (this.state.newPost === true) {
        this.setState({ posts: posts, newPost: false });
      }
    });
  }

  componentDidMount() {
    let thread_id = this.props.match.params.threadId;
    Axios.get(`/api/threads/view/${thread_id}`).then(res => {
      this.setState({
        title: res.data.title,
        score: res.data.score,
        date: res.data.createdAt
      });
    });
    Axios.get(`/api/threads/view/${thread_id}/posts`).then(res => {
      const posts = res.data.posts;
      this.setState({ posts: posts });
    });
    window.addEventListener("scroll", this.handleScroll);
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
    const sub = this.state.subscribed;
    this.setState({ subscribed: !sub });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      thread_id: this.props.match.params.threadId,
      content: document.getElementsByName("content")[0].value
    };
    Axios.post("/api/posts/new", data).then(res => {
      console.log("Post created");
      this.setState({ newPost: true });
    });
    document.getElementsByName("content")[0].value = "";
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

  render() {
    return (
      <Container className="single-thread">
        <div className="card-wrapper sticky-header" id="sticky-header">
          <h3 className="title mr-auto">{this.state.title}</h3>
          <div className="menu-expand">
            <i className="fa fa-ellipsis-h" />
          </div>
        </div>
        <div id="thread-header" className="card-wrapper header">
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
              {this.state.posts.length} posts
            </p>
            <div className="topics-wrapper">
              <a className="topic" href="./">
                asp.net
              </a>
            </div>
          </div>
        </div>
        {this.state.posts.map((post, idx) => {
          return (
            <Post
              key={post.post_id}
              post_id={post.post_id}
              content={post.content}
              score={post.score}
              author={post.posted_by}
              created={post.createdAt}
            />
          );
        })}
        <div className="card-wrapper trans">
          <form id="thread-reply" onSubmit={this.handleSubmit}>
            <ReplyForm />
          </form>
        </div>
      </Container>
    );
  }
}

export default Thread;
