import React, { Component } from "react";
import Create from "./Create";
import ReplyForm from "./elements/ReplyForm";
import Index from "./Index";
import Container from "react-bootstrap/Container";
import Post from "./elements/Post";

class Thread extends Component {
  static Create = Create;
  static Reply = ReplyForm;
  static Index = Index;

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
      <Container className="single-thread">
        <div className="card-wrapper header">
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
            <h3 className="title">
              I am trying to store output from calculator and display on label
              or text box in visual basic asp.net
            </h3>
            <p className="subtitle">Mar 23, 2019 - 20 comments</p>
            <div className="topics-wrapper">
              <a className="topic" href="./">
                asp.net
              </a>
            </div>
          </div>
        </div>
        <Post content="[b]Test[/b]" />
      </Container>
    );
  }
}

export default Thread;
