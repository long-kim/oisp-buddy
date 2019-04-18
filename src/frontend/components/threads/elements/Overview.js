import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: 0,
      score: this.props.score,
      subscribed: false,
      voted: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.voted !== prevProps.voted) {
      this.setState({ voted: this.props.voted });
    }
    if (this.props.sub !== prevProps.sub) {
      this.setState({ subscribed: this.props.sub });
    }
    if (
      this.state.score !== this.props.score &&
      this.state.voted !== this.props.voted
    ) {
      Axios.patch(`/api/threads/${this.props.thread_id}/edit/score`, {
        score: this.state.score
      }).then(() => {
        Axios.post(`/api/threads/${this.props.thread_id}/vote`, {
          voted: this.state.voted
        });
      });
    }
  }

  handleSubscribe = () => {
    const sub = this.state.subscribed;
    if (!sub) {
      this.setState({ subscribed: true });
      Axios.get(`/api/threads/${this.props.thread_id}/subscribe`);
    } else {
      this.setState({ subscribed: false });
      Axios.get(`/api/threads/${this.props.thread_id}/unsubscribe`);
    }
  };

  updateScore = val => {
    const score = this.state.score;
    let voted = this.props.voted;
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
      <div className="overview">
        <div className="card-wrapper">
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
            <Link
              className="thread-title"
              to={`thread/${this.props.thread_id}`}
            >
              {this.props.title}
            </Link>
            <div className="topics-wrapper">
              <a className="topic" href="./">
                asp.net
              </a>
            </div>
          </div>
          <div className="control-group interact">
            <div className="control" onClick={this.handleSubscribe}>
              <i
                className="fa fa-star"
                style={
                  this.state.subscribed
                    ? {
                        color: "#F5E26D",
                        textShadow: "0 3px 6px rgba(131, 116, 24, 0.19)"
                      }
                    : {}
                }
              />
            </div>
            <div className="control comment">
              <i className="fa fa-comment" />
              <span className="comment-number">{this.state.comments}</span>
            </div>
            <div className="control">
              <i className="fa fa-share-alt" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
