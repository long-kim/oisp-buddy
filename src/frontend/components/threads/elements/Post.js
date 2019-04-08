import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import img from "assets/img/avatar_nhu.jpg";
import BBParser from "./BBParser";
import Axios from "axios";
import Moment from "react-moment";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score,
      voted: 0,
      posted_by: {}
    };
  }

  componentDidMount() {
    Axios.get(`/api/posts/${this.props.post_id}`).then(res => {
      console.log(res);
      this.setState({ posted_by: res.data });
    });
  }

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
      <div className="card-wrapper post">
        <div className="post-header">
          <div className="author-avatar">
            <img src={img} alt="Avatar" />
          </div>
          <div className="header-content mr-auto">
            <div className="author-info">
              <a href={`/user/${this.props.author}`} className="author">
                {this.state.posted_by.name}
              </a>
              <Badge variant="secondary" className="badge">
                senior
              </Badge>
            </div>
            <div className="timestamp">
              <Moment fromNow>{this.props.created}</Moment>
            </div>
          </div>
          <div className="menu-expand">
            <i className="fa fa-ellipsis-h" />
          </div>
        </div>
        <div className="post-content">
          <BBParser input={this.props.content} />
        </div>
        <div className="post-control">
          <div className="control-group vote">
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
          <a className="control" href="#">
            reply
          </a>
        </div>
      </div>
    );
  }
}

export default Post;
