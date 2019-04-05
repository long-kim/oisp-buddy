import React, { Component } from "react";
import { BrowserRouter as _Router, _Route, Link } from "react-router-dom";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: 0,
      score: this.props.score | 0,
      subscribed: false,
      voted: 0
    };
  }

  handleSubscribe = () => {
    const sub = this.state.subscribed;
    this.setState({ subscribed: !sub });
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
              to={`./thread/${this.props.post_id}`}
            >
              I am trying to store output from calculator and display on label
              or text box in visual basic asp.net
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
