import React, { Component } from "react";
import Axios from "axios";
import * as styles from "./style.css";
import { Link, NavLink, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      avatar: "",
      cover: "",
      fullname: "",
      year: undefined,
      major: "",
      about: "",
      status: undefined,
      action: undefined,
      idd: localStorage.getItem("id"),
      friendID: undefined,
      threadd: []
    };
    this.handleStatus = this.handleStatus.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this._renderThread = this._renderThread.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.user_id
    });

    Axios.get("/api/users/viewfriend", {
      params: {
        user_id: this.props.match.params.user_id
      }
    }).then(res => {
      this.setState({
        fullname: res.data[0].first_name + " " + res.data[0].last_name,
        avatar: res.data[0].avatar,
        major: res.data[0].dept,
        cover: res.data[0].cover,
        about: res.data[0].about
      });
    });

    Axios.get("/api/users/friendstatus", {
      params: {
        user_id1:
          this.props.match.params.user_id < this.state.idd
            ? this.props.match.params.user_id
            : this.state.idd,
        user_id2:
          this.props.match.params.user_id > this.state.idd
            ? this.props.match.params.user_id
            : this.state.idd
      }
    }).then(res => {
      this.setState({
        status: res.data[0] ? res.data[0].status : 2,
        action: res.data[0] ? res.data[0].action_user_id : 0,
        friendID: res.data[0] ? res.data[0].id : 0
      });
    });

    Axios.get("/api/threads/threadlist", {
      params: {
        user: this.props.match.params.user_id
      }
    }).then(res => {
      this.setState({
        threadd: res.data
      });
    });
  }
  handleRequest() {
    return alert("yes yes yes");
  }

  _renderThread() {
    let url;
    return Object.keys(this.state.threadd).map((obj, i) => {
      url = "/forum/thread/" + this.state.threadd[obj].thread_id;
      return (
        <div key={i}>
          {/* thread name:{" "}
          {this.state.threadd[obj].title
            ? this.state.threadd[obj].title
            : "no number"}{" "}
          author is: {this.state.threadd[obj].author_id} */}
          <Link to={url}>
            <div className="media">
              <div className="media-left">
                <img
                  src={this.state.avatar}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "50%"
                  }}
                />
              </div>
              <div className="media-body" style={{ paddingLeft: "50px" }}>
                <h4 className="media-heading">{this.state.fullname}</h4>
                <p>{this.state.threadd[obj].title}</p>
              </div>
            </div>
          </Link>
          <hr />
        </div>
      );
    });
  }

  handleStatus(e) {
    e.preventDefault();
    return this.state.status == 1
      ? (Axios.patch("/api/users/edit/friend", {
          id: this.state.friendID,
          status: 2,
          action_user_id: this.state.idd
        }),
        alert("you two are no longer friends"))
      : this.state.status == 0 && this.state.action == this.state.idd
      ? alert("please wait to be accepted")
      : this.state.status == 0 && this.state.action != this.state.idd
      ? (Axios.patch("/api/users/edit/friend", {
          id: this.state.friendID,
          status: 1,
          action_user_id: this.state.idd
        }),
        alert(
          "you two are now friends, refesh page and click the symbol again if you wanna delete friend"
        ))
      : (Axios.patch("/api/users/edit/friend", {
          id: this.state.friendID,
          status: 0,
          action_user_id: this.state.idd
        }),
        alert("request sent! please wait to be accepted"));
  }

  render() {
    return (
      <div>
        {/* This should be {this.state.fullname} aka{" "}
        {this.state.id ? this.state.id : "no"}'s page
        <hr />
        <img src={this.state.avatar} alt="user's avatar" />
        <hr />
        <img src={this.state.cover} alt="user's cover" /> */}
        {localStorage.getItem("oisp-token") == null ? (
          <Link to="/login">
            <Button type="button" className="mr-lg-2 mb-2 mb-lg-0">
              Click here to log in first
            </Button>
          </Link>
        ) : this.props.match.params.user_id == localStorage.getItem("id") ? (
          <Redirect to="/profile" />
        ) : (
          // <div>{this.state.friendlist !== [] ? this.state.dodai : "false"}</div>
          <div>
            <header className="header">
              <img src={this.state.cover} alt="user's cover" />
              <h6>
                <button type="button" onClick={this.handleStatus}>
                  {this.state.status === 1 ? (
                    <i className="fas fa-user-check" />
                  ) : this.state.status === 2 ? (
                    <i className="fas fa-user-plus" />
                  ) : this.state.status === 0 ? (
                    <i className="fas fa-user-clock" />
                  ) : this.state.status == 3 ? (
                    <i className="fas fa-user-lock" />
                  ) : (
                    <i className="far fa-frown" />
                  )}
                </button>
              </h6>
              <h2 className="user_name">
                {this.state.fullname} <br />
                <h6>
                  Class of {this.state.year} - {this.state.major}
                </h6>
              </h2>

              {/* <div class="polaroid">
              <img src={this.state.avatar} alt="user's avatar" />
            </div> */}
              <div className="polaroid">
                <img src={this.state.avatar} alt="user's avatar" />

                <div className="container">
                  <p>ABOUT </p>
                  <h6>{this.state.about} </h6>

                  <hr />
                  <p className="info">
                    <h7 style={{ float: "left" }}>
                      <Link to="/forum/index">THREAD</Link>
                    </h7>{" "}
                    <h7 style={{ float: "right" }}>
                      {Object.keys(this.state.threadd).length}
                    </h7>{" "}
                    <br />
                    <h7 style={{ float: "left" }}>ACHIVEMENT</h7>{" "}
                    <h7 style={{ float: "right" }}>0</h7>
                    <br />
                  </p>
                </div>
              </div>
            </header>
            <body className="info_body2">{this._renderThread()}</body>
          </div>
        )}
      </div>
    );
  }
}

export default FriendProfile;
