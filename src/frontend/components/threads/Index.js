import React, { Component } from "react";
import Overview from "./elements/Overview";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Axios from "axios";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threads: [],
      subs: [],
      votes: [],
      topic: ""
    };
  }

  componentDidMount() {
    Axios.get(`/api/threads/index${this.props.location.search}`, {
      headers: { Authorization: `Bearer ` + localStorage.getItem("oisp-token") }
    })
      .then(res => {
        this.setState({ threads: res.data.threads, topic: res.data.topic });
        return Promise.resolve();
      })
      .then(() => {
        return Axios.get("/api/users/subscriptions");
      })
      .then(res => {
        console.log(res);
        this.setState({ subs: res.data });
        return Promise.resolve();
      })
      .then(() => {
        return Axios.get("/api/users/votes/thread");
      })
      .then(res => {
        this.setState({ votes: res.data });
      })
      .catch(err => {
        console.error(err);
      });
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

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      Axios.get(`/api/threads/index${this.props.location.search}`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("oisp-token")
        }
      })
        .then(res => {
          this.setState({ threads: res.data.threads, topic: res.data.topic });
          return Promise.resolve();
        })
        .then(() => {
          return Axios.get("/api/users/subscriptions");
        })
        .then(res => {
          this.setState({ subs: res.data });
          return Promise.resolve();
        })
        .then(() => {
          return Axios.get("/api/users/votes/thread");
        })
        .then(res => {
          this.setState({ votes: res.data });
        })
        .catch(err => {
          console.error(err);
        });
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
    this.props.history.push("/forum/index")
  }

  render() {
    return (
      <Container className="index">
        <div className="card-wrapper header sticky">
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
        </div>
        {this.state.threads.map(thread => {
          return (
            <Overview
              thread_id={thread.thread_id}
              score={thread.score}
              title={thread.title}
              key={thread.thread_id}
              topics={thread.Topics}
              sub={this.state.subs.indexOf(thread.thread_id) !== -1}
              voted={this.getVote(thread.thread_id)}
            />
          );
        })}
      </Container>
    );
  }
}

export default Index;
