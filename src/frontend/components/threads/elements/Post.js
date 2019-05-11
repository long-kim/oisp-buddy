import React, { Component } from "react";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import BBParser from "./BBParser";
import Axios from "axios";
import Moment from "react-moment";
import Popup from "reactjs-popup";
import AnchorLink from "react-anchor-link-smooth-scroll";
import ReplyForm from "./ReplyForm";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import classNames from "classnames";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      voted: 0,
      posted_by: {},
      modal_is_open: false,
      popup_is_open: false,
      current_user: false,
      edit_mode: false,
      avatar: `${this.props.author.avatar}`,
      showControl: false,
      ownPost: false
    };
  }

  avatar = null;
  currentUser = false;

  componentDidMount() {
    if (this.props.parent_score) {
      const props = this.props.parent_score;
      this.setState({
        score: props.score,
        voted: props.voted
      });
    }
    this.setState({
      current_user:
        parseInt(localStorage.getItem("user_id")) === this.props.author,
      score: this.props.score
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.voted !== prevProps.voted) {
      this.setState({ voted: this.props.voted });
    }
    if (this.props.score !== prevProps.score) {
      this.setState({ score: this.props.score });
    }
    if (this.state.edit_mode === true) {
      const post = document.getElementById(`${this.props.post_id}`);
      const text = post.getElementsByTagName("textarea")[0];
      text.value = this.props.content;
      text.focus();
    }
  }

  toggleControls = () => {
    const state = this.state.showControl;
    this.setState({ showControl: !state });
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
    Axios.patch(`/api/posts/edit/${this.props.post_id}/score`, {
      score: score + val
    }).then(res => console.log(res));
    Axios.post(`/api/posts/${this.props.post_id}/vote`, {
      voted: voted + val
    });
  };

  focusReplyForm = () => {
    this.setState({ popup_is_open: false });
    const quote = `[quote author_id=${this.props.author} name="${[
      this.props.author_info.first_name,
      this.props.author_info.last_name
    ].join(" ")}" parent_id=${this.props.parent_id} post_id=${
      this.props.post_id
    }]${this.props.content}[/quote]`;
    document.getElementById("reply-btn").click();
    const textarea = document.getElementsByName("content")[0];
    textarea.value = quote;
    textarea.focus();
  };

  openModal = () => {
    this.setState({ modal_is_open: true });
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
  };

  closeModal = () => {
    this.setState({ modal_is_open: false, popup_is_open: false });
    document.getElementsByTagName("body")[0].style.overflow = "initial";
  };

  openEdit = () => {
    this.toggleControls();
    this.setState({ edit_mode: true, popup_is_open: false });
  };

  cancelEdit = () => {
    this.setState({ edit_mode: false });
  };

  openPopup = () => {
    this.setState({ popup_is_open: true });
  };

  closePopup = () => {
    this.setState({ popup_is_open: false });
  };

  handleEditPost = e => {
    this.setState({ popup_is_open: false });
    e.preventDefault();
    const post = document.getElementById(`${this.props.post_id}`);
    const text = post.getElementsByTagName("textarea")[0];
    const data = { content: text.value };
    Axios.patch(`/api/posts/edit/${this.props.post_id}`, data).then(res => {
      console.log(res);
      this.cancelEdit();
      this.props.edit();
    });
  };

  handleDeletePost = () => {
    Axios.delete(`/api/posts/delete/${this.props.post_id}`).then(res => {
      console.log(res);
      this.props.delete();
      document.getElementsByTagName("body")[0].style.overflow = "initial";
    });
  };

  render() {
    return (
      <div className="card-wrapper post" id={this.props.post_id}>
        <div className="info-panel">
          <div className="info-main">
            <Link
              to={`/users/${this.props.author}`}
              style={{
                backgroundImage: `url(${this.props.author.avatar})`
              }}
              className="user-avatar"
            />
            <Link
              to={`/users/${this.props.author.user_id}`}
              className="username"
            >
              {this.props.author.name}
            </Link>
          </div>
          <div className="info-extra">
            <div className="extra-top">
              <Badge variant="primary" className="badge">
                senior
              </Badge>
            </div>
            <div className="extra-bottom">
              <span>Joined April 2019</span>
              <span>10 posts</span>
            </div>
          </div>
        </div>
        <div
          className="post-body"
          onMouseOver={this.toggleControls}
          onMouseOut={this.toggleControls}
        >
          <div
            className={classNames("control-wrapper", {
              show: this.state.showControl
            })}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Quote and reply</Tooltip>}
              container={this}
            >
              <div
                className="btn-reply control-btn"
                onClick={this.focusReplyForm}
              >
                <i className="fa fa-fw fa-reply" />
              </div>
            </OverlayTrigger>
            {this.props.ownPost && (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Edit Post</Tooltip>}
              >
                <div className="btn-edit control-btn" onClick={this.openEdit}>
                  <i className="fa fa-fw fa-pencil" />
                </div>
              </OverlayTrigger>
            )}
            {this.props.ownPost && (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Delete Post</Tooltip>}
              >
                <div className="btn-delete btn-danger control-btn">
                  <i className="fa fa-fw fa-trash-o" />
                </div>
              </OverlayTrigger>
            )}
          </div>
          <div className="timestamp">
            posted&nbsp;
            <Moment fromNow>{this.props.timestamp}</Moment>
          </div>
          <div className="post-content">
            <form
              id={`edit-form-${this.props.post_id}`}
              onSubmit={this.handleEditPost}
            >
              {this.state.edit_mode && (
                <ReplyForm edit={true} cancel={this.cancelEdit} />
              )}
            </form>
            {!this.state.edit_mode && <BBParser input={this.props.content} />}
          </div>
          {!this.state.edit_mode && (
            <div className="post-control">
              <div
                className="control-group vote"
                style={this.props.parent_score && { pointerEvents: "none" }}
              >
                <div
                  className="control"
                  onClick={this.updateScore.bind(this, 1)}
                >
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
                <div
                  className="control"
                  onClick={this.updateScore.bind(this, -1)}
                >
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
            </div>
          )}
        </div>
        {/* <div className="post-header">
          <div className="author-avatar">
            <img src={this.state.avatar} alt="Avatar" />
          </div>
          <div className="header-content mr-auto">
            <div className="author-info">
              <a href={`/user/${this.props.author}`} className="author">
                {[
                  this.props.author_info.first_name,
                  this.props.author_info.last_name
                ].join(" ")}
              </a>
              <Badge variant="secondary" className="badge">
                senior
              </Badge>
            </div>
            <div className="timestamp">
              <Moment fromNow>{this.props.created}</Moment>
            </div>
          </div>
          <span className="no-post">{`#${this.props.no + 1}`}</span>
          <Popup
            trigger={
              <div className="menu-expand">
                <i className="fa fa-ellipsis-h" />
              </div>
            }
            position="bottom right"
            on="click"
            arrow={false}
            closeOnDocumentClick
            open={this.state.popup_is_open}
            onOpen={this.openPopup}
            onClose={this.closePopup}
          >
            <ul>
              <Popup
                on="click"
                trigger={<li>Share</li>}
                modal={true}
                closeOnDocumentClick
                onOpen={this.openModal}
                onClose={this.closeModal}
                open={this.state.modal_is_open}
              />

              <li onClick={this.focusReplyForm}>Quote</li>
              {this.state.current_user && (
                <div className="divider" role="separator" />
              )}
              {this.state.current_user && <li onClick={this.openEdit}>Edit</li>}
              {this.state.current_user && this.props.no !== 0 && (
                <div className="modal-wrapper">
                  <Popup
                    on="click"
                    trigger={<li className="delete">Delete</li>}
                    modal={true}
                    closeOnDocumentClick={false}
                    onOpen={this.openModal}
                    onClose={this.closeModal}
                    open={this.state.modal_is_open}
                  >
                    <div className="modal-confirm">
                      <div className="header">Confirm Delete Post</div>
                      <div className="content">
                        <i className="fa fa-exclamation-triangle" />
                        Are you sure? This action cannot be reverted!
                      </div>
                      <div className="control-group">
                        <div className="control" onClick={this.closeModal}>
                          Cancel
                        </div>
                        <div
                          className="control red"
                          onClick={this.handleDeletePost}
                        >
                          Proceed
                        </div>
                      </div>
                    </div>
                  </Popup>
                </div>
              )}
            </ul>
          </Popup>
        </div> */}
      </div>
    );
  }
}

export default Post;
