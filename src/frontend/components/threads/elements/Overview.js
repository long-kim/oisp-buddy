import React, { Component } from "react";

class Overview extends Component {
  render() {
    return (
      <div className="overview">
        <div className="card-wrapper">
          <div className="control-group score">
            <div className="control">
              <i className="fa fa-angle-up" />
            </div>
            <span className="score">0</span>
            <div className="control">
              <i className="fa fa-angle-down" />
            </div>
          </div>
          <div className="content">
            <a className="thread-title" href="./">
              I am trying to store output from calculator and display on label
              or text box in visual basic asp.net
            </a>
            <div className="topics-wrapper">
              <a className="topic" href="./">
                asp.net
              </a>
            </div>
          </div>
          <div className="control-group interact">
            <div className="control">
              <i className="fa fa-star"></i>
            </div>
            <div className="control comment">
              <i className="fa fa-comment"></i>
              <span className="comment-number">1</span>
            </div>
            <div className="control">
              <i className="fa fa-share-alt"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
