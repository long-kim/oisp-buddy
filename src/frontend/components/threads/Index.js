import React, { Component } from "react";
import Overview from "./elements/Overview";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Axios from "axios";
import cover from "assets/img/forum-bg.jpg";
import CircularProgress from "@material-ui/core/CircularProgress";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threads: [],
      subs: [],
      votes: [],
      topic: "",
      isLoading: true
    };
  }

  async componentDidMount() {
    const response = await Axios.get(
      `/api/threads/index${this.props.location.search}`
    );
    const data = response.data;
    this.setState({
      threads: data,
      isLoading: false
    });
    // Axios.get(`/api/threads/index${this.props.location.search}`)
    //   .then(res => {
    //     this.setState({ threads: res.data.threads, topic: res.data.topic });
    //     return Promise.resolve();
    //   })
    //   .then(() => {
    //     return Axios.get("/api/users/subscriptions");
    //   })
    //   .then(res => {
    //     this.setState({ subs: res.data });
    //     return Promise.resolve();
    //   })
    //   .then(() => {
    //     return Axios.get("/api/users/votes/thread");
    //   })
    //   .then(res => {
    //     this.setState({ votes: res.data });
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }

  handleMouseEnter = () => {
    const clear = document
      .getElementById("filter")
      .getElementsByClassName("clear-filter")[0];
    clear.classList.remove("hidden");
  };

  handleMouseLeave = () => {
    const clear = document
      .getElementById("filter")
      .getElementsByClassName("clear-filter")[0];
    clear.classList.add("hidden");
  };

  async componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const response = await Axios.get(
        `/api/threads/index${this.props.location.search}`
      );
      const data = response.data;
      this.setState({
        threads: data
      });
      // Axios.get(`/api/threads/index${this.props.location.search}`, {
      //   headers: {
      //     Authorization: `Bearer ` + localStorage.getItem("oisp-token")
      //   }
      // })
      //   .then(res => {
      //     this.setState({ threads: res.data.threads, topic: res.data.topic });
      //     return Promise.resolve();
      //   })
      //   .then(() => {
      //     return Axios.get("/api/users/subscriptions");
      //   })
      //   .then(res => {
      //     this.setState({ subs: res.data });
      //     return Promise.resolve();
      //   })
      //   .then(() => {
      //     return Axios.get("/api/users/votes/thread");
      //   })
      //   .then(res => {
      //     this.setState({ votes: res.data });
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    }
  }

  getVote = thread_id => {
    let result = 0;
    for (let vote_obj of this.state.votes) {
      if (vote_obj.thread_id === thread_id) {
        result = vote_obj.voted;
      }
    }
    return result;
  };

  handleClearFilter = () => {
    this.props.history.push("/forum/index");
  };

  render() {
    return (
      <Container className="index">
        <div className="forum-header">
          <img src={cover} />
          <h1 className="title">Forum</h1>
        </div>
        <div className="thread-wrapper threads-list">
          {this.state.isLoading && (
            <div className="loading">
              <CircularProgress color="secondary" />
              <h4>Hang in there...</h4>
            </div>
          )}
          <div className="wrapper-header">
            <h2>Threads</h2>
            <Link to="/forum/create">
              <Button
                type="button"
                variant="secondary"
                className="forum-btn new-thread"
              >
                <span>New Thread</span>
                <i className="fas fa-fw fa-plus" />
              </Button>
            </Link>
          </div>
          <ul className="threads">
            {!this.state.isLoading &&
              this.state.threads.map(thread => {
                return (
                  <Overview
                    thread_id={thread.thread_id}
                    author={thread.author}
                    last_reply={thread.last_reply}
                    posts_count={thread.posts_count}
                    score={thread.score}
                    title={thread.title}
                    key={thread.thread_id}
                    topics={thread.Topics}
                    sub={thread.sub}
                    voted={this.getVote(thread.thread_id)}
                  />
                );
              })}
          </ul>
        </div>
        {/* <div className="card-wrapper header sticky">
          <h3 className="mr-auto">Threads</h3>
          {this.props.location.search !== "" && (
            <div
              className="filter"
              id="filter"
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <span className="topic-filter">
                Topic: {`${this.state.topic}`}
              </span>
              <div
                className="clear-filter hidden"
                onClick={this.handleClearFilter}
              >
                Clear <i className="fa fa-times" />
              </div>
            </div>
          )}
          <Link className="post-anchor" to={`./create`}>
            <Button variant="primary" className="post-btn">
              New
            </Button>
          </Link>
        </div> */}
      </Container>
    );
  }
}

export default Index;
