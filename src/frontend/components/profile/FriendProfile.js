import React, { Component } from "react";
import Axios from "axios";
import * as styles from "./style.css";
import { Link, NavLink, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Modal from "react-bootstrap/Modal";

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
      threadd: [],
      showModal: false,
      showModal2: false
    };
    this.handleStatus = this.handleStatus.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this._renderThread = this._renderThread.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
      if (res.data == null) {
        Axios.post("/api/users/new/friend", {
          user1:
            this.props.match.params.user_id < this.state.idd
              ? this.props.match.params.user_id
              : this.state.idd,
          user2:
            this.props.match.params.user_id > this.state.idd
              ? this.props.match.params.user_id
              : this.state.idd,
          action: this.state.idd
        }).then(res => {
          this.setState({
            status: 0,
            action: this.state.idd
          });
        });
      } else {
        this.setState({
          status: res.data[0] ? res.data[0].status : null,
          action: res.data[0] ? res.data[0].action_user_id : 0,
          friendID: res.data[0] ? res.data[0].id : 0
        });
      }
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
        <div key={i} className="myThread">
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
      ? this.setState({
          showModal2: true
        })
      : this.state.status == 0 && this.state.action == this.state.idd
      ? alert("please wait to be accepted")
      : this.state.status == 0 && this.state.action != this.state.idd
      ? this.setState({
          showModal: true
        })
      : this.state.status != null
      ? (Axios.patch("/api/users/edit/friend", {
          id: this.state.friendID,
          status: 0,
          action_user_id: this.state.idd
        }).then(() => {
          this.setState({
            status: 0
          });
        }),
        alert("request sent! please wait to be accepted"))
      : (Axios.post("/api/users/new/friend", {
          user1:
            this.props.match.params.user_id < this.state.idd
              ? this.props.match.params.user_id
              : this.state.idd,
          user2:
            this.props.match.params.user_id > this.state.idd
              ? this.props.match.params.user_id
              : this.state.idd,
          action: this.state.idd
        }).then(res => {
          this.setState({
            status: 0,
            action: this.state.idd
          });
        }),
        alert("Friend Request sent!"));
  }

  handleClick = params => e => {
    e.preventDefault();
    return params === "decline"
      ? (Axios.patch("/api/users/edit/friend", {
          id: this.state.friendID,
          status: 2,
          action_user_id: this.state.idd
        }).then(() => {
          this.setState({
            status: 2
          });
        }),
        this.setState({
          showModal: false
        }))
      : params === "stop"
      ? (Axios.patch("/api/users/edit/friend", {
          id: this.state.friendID,
          status: 2,
          action_user_id: this.state.idd
        }).then(() => {
          this.setState({
            status: 2
          });
        }),
        this.setState({ showModal2: false }))
      : (Axios.patch("/api/users/edit/friend", {
          id: this.state.friendID,
          status: 1,
          action_user_id: this.state.idd
        }).then(() => {
          this.setState({
            status: 1
          });
        }),
        this.setState({
          showModal: false
        }));
  };

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
        ) : this.state.status === 3 && this.state.action != this.state.id ? (
          <div
            style={{
              margin: "auto",
              top: "30%",
              left: "40%",
              position: "absolute",
              textAlign: "center"
            }}
          >
            <p style={{ color: "#925f4a" }}>
              <i class="fas fa-sad-cry" style={{ fontSize: "150px" }} />
            </p>
            <p style={{ color: "#615959" }}>
              {" "}
              Oh no! you cannot view this user
            </p>
            <Link to="/">
              <p>
                <button type="button" className="btn btn-danger">
                  GO TO HOMEPAGE
                </button>
              </p>
            </Link>
          </div>
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
                    <i className="far fa-user-plus" />
                  )}
                </button>
              </h6>
              <h2 className="user_name">
                {this.state.fullname}
                <br />
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
            <body className="info_body2">
              {this._renderThread()}
              {Object.keys(this.state.threadd).length > 0 ? (
                <div className="readmore">
                  <Link to="/forum/index">
                    <button type="button" className="readmore">
                      Show more →
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <p style={{ color: "#925f4a", fontStyle: "italic" }}>
                    This user has no thread, click the link below to see other
                    users' threads
                  </p>
                  <div className="readmore">
                    <Link to="/forum/index">
                      <button type="button" className="readmore">
                        Show more →
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </body>
          </div>
        )}
        <Modal
          show={this.state.showModal}
          onHide={() => {
            this.setState({ showModal: false });
          }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#a56a4b" }}>
              Do you want to be friends with this user?
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClick("decline")}>
              Decline
            </Button>
            <Button
              style={{ backgroundColor: "#a56a4b", color: "white" }}
              variant="primary"
              onClick={this.handleClick("accept")}
            >
              Accept
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showModal2}
          onHide={() => {
            this.setState({ showModal2: false });
          }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#a56a4b" }}>
              Are you sure you want to stop being friends with this user?
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  showModal2: false
                })
              }
            >
              No
            </Button>
            <Button
              style={{ backgroundColor: "#a56a4b", color: "white" }}
              variant="primary"
              onClick={this.handleClick("stop")}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default FriendProfile;
