import React, { Component } from "react";
import * as styles from "./style.css";
import { Link, NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";
import Friendlist from "./Friendlist";
import Info from "./Info";
//import Calendar from 'react-calendar/dist/entry.nostyle';
import Axios from "axios";
import Popup from "reactjs-popup";
const jwt = require("jsonwebtoken");

class Profile extends Component {
  static Friendlist = Friendlist;
  static Info = Info;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      about: "",
      avatar: "",
      cover: "",
      year: undefined,
      major: "",
      friends: undefined,
      thread: "0",
      achivement: "0",
      // idd: localStorage.getItem("id"),
      id: localStorage.getItem("id"), // lay id tu token
      test: "",
      newavatar: "",
      newcover: "",
      showModal: false,
      showModal2: false,
      friendlist: [],
      friendID: [],
      threadd: [],
      pending: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._renderObject = this._renderObject.bind(this);
    this._renderNoti = this._renderNoti.bind(this);
  }
  //test
  componentDidMount() {
    // const user_id = jwt.decode(this.state.id).id;
    // console.log("test: "+user_id);
    // data
    Axios.get(`/api/users/view`, { user_id: this.state.id }).then(res => {
      this.setState({
        name: res.data.first_name + " " + res.data.last_name,
        year: res.data.year,
        major: res.data.dept,
        avatar: res.data.avatar,
        cover: res.data.cover,
        about: res.data.about
      });
    });
    Axios.get("/api/users/friendlist", {
      params: {
        user_id: this.state.id
      }
    }).then(res => {
      this.setState({
        friendlist: res.data
      });
    });

    Axios.get("/api/threads/threadlist", {
      params: {
        user: this.state.id
      }
    }).then(res => {
      this.setState({
        threadd: res.data
      });
    });

    Axios.get("/api/users/friendnoti", {
      params: {
        action_user: this.state.id
      }
    }).then(res => {
      this.setState({
        // status: res.data[0] ? res.data[0].status : 2,
        // action: res.data[0] ? res.data[0].action_user_id : 0,
        // friendID: res.data[0] ? res.data[0].id : 0
        pending: res.data
      });
    });
    // Axios.get("/api/threads/index")
  }

  _renderObject() {
    let url;
    return Object.keys(this.state.threadd).map((obj, i) => {
      url = "/forum/thread/" + this.state.threadd[obj].thread_id;
      return (
        <div key={i} className="myThread">
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

  _renderNoti() {
    let url;
    return Object.keys(this.state.pending).map((obj, i) => {
      url = "/profile/friendlist/" + this.state.pending[obj].action_user_id;

      return (
        <div key={i}>
          {/* thread number:{" "}
          {this.state.friendlist[obj].title
            ? this.state.friendlist[obj].title
            : "no number"}
          author is: {this.state.friendlist[obj].author_id} */}

          <Link to={url}>
            user{" "}
            {this.state.pending[obj].action_user_id
              ? this.state.pending[obj].action_user_id
              : "no one"}{" "}
            wanted to be friend
          </Link>
          <hr />
        </div>
      );
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleOpenModal = param => e => {
    return param === "ava"
      ? this.setState({ showModal: true })
      : param === "cover"
      ? this.setState({ showModal2: true })
      : this.setState({ showModal: false, showModal2: false });
  };

  handleCloseModal() {
    this.setState({ showModal: false, showModal2: false });
  }

  handleSubmit = param => e => {
    e.preventDefault();
    return param === "avatar"
      ? (Axios.patch("/api/users/edit/avatar", {
          avatar: this.state.newavatar,
          user_id: this.state.id
        }),
        alert("Avatar has changed"))
      : param === "cover"
      ? (Axios.patch("/api/users/edit/cover", {
          cover: this.state.newcover,
          user_id: this.state.id
        }),
        alert("Cover has changed"))
      : "no cant do babydoll";
  };

  render() {
    this.state.friend = Object.keys(this.state.friendlist).length;
    // for (let i = 0; Object.keys(this.state.friendlist).length; i++) {
    //   this.state.friendID.push(Object.values(this.state.friendlist));
    // }
    return (
      <div>
        {localStorage.getItem("oisp-token") == null ? (
          <Link to="/login">
            <Button type="button" className="mr-lg-2 mb-2 mb-lg-0">
              Click here to log in first
            </Button>
          </Link>
        ) : (
          <div>
            <header className="header">
              <img src={this.state.cover} alt="user's cover" />
              <h6>
                <button type="button" onClick={this.handleOpenModal("cover")}>
                  <i className="fas fa-pencil-alt" />
                </button>
              </h6>
              <h2 className="user_name">
                {this.state.name} <br />
                <h6>
                  Class of {this.state.year} - {this.state.major}
                </h6>
              </h2>
              <button
                className="ava_pencil"
                type="button"
                onClick={this.handleOpenModal("ava")}
              >
                <i className="fas fa-pencil-alt" />
              </button>
              <div className="polaroid">
                <img src={this.state.avatar} alt="user's avatar" />

                <div className="container">
                  <p>ABOUT </p>
                  <h6>{this.state.about} </h6>
                  <div className="readmore">
                    <Link to="profile/info">
                      <button type="button" className="readmore">
                        Read more →
                      </button>
                    </Link>
                  </div>
                  <hr />
                  <p className="info">
                    <h7 style={{ float: "left" }}>
                      <Link to="profile/friendlist">FRIEND</Link>
                    </h7>{" "}
                    <h7 style={{ float: "right" }}>
                      {this.state.friendlist !== []
                        ? this.state.friend
                        : "false"}
                    </h7>{" "}
                    <br />
                    <h7 style={{ float: "left" }}>
                      <Link to="/forum/index">THREAD</Link>
                    </h7>{" "}
                    <h7 style={{ float: "right" }}>
                      {Object.keys(this.state.threadd).length}
                    </h7>{" "}
                    <br />
                    <h7
                      style={{ float: "left", cursor: "pointer" }}
                      onClick={() => alert("You have no achievement")}
                    >
                      ACHIVEMENT
                    </h7>{" "}
                    <h7 style={{ float: "right" }}>{this.state.achivement}</h7>
                    <br />
                  </p>
                </div>
              </div>
            </header>

            <body className="info_body2">
              {/* {this.state.friendlist != null
                ? Object.values(this.state.friendlist.toString())
                : "no list"} */}
              {this._renderObject()}
              {/* {this._renderNoti()} */}
              {/* user {Object.keys(this.state.pending).length} is waiting */}
            </body>
            <div className="fr_req">
              <div className="noti">
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                  >
                    Friend Requests
                    <span className="caret" />
                  </button>
                  <ul
                    className="dropdown-menu"
                    style={{
                      height: "auto",
                      overflow: "auto",
                      maxHeight: "150px"
                    }}
                  >
                    <li>{this._renderNoti()}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        <Popup
          open={this.state.showModal}
          modal
          onClose={this.handleCloseModal}
        >
          <div className="card" style={{ width: "400px", height: "200px" }}>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label for="ava_url">URL to your image</label>
                  <input
                    type="url"
                    className="form-control"
                    name="newavatar"
                    placeholder="Enter URL"
                    value={this.state.newavatar}
                    onChange={this.handleChange}
                  />
                  <small id="URLlHelp" className="form-text text-muted">
                    Recommend size: 290px x 400px
                  </small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSubmit("avatar").bind(this)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={this.handleCloseModal}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </Popup>

        <Popup
          open={this.state.showModal2}
          modal
          onClose={this.handleCloseModal}
        >
          <div className="card" style={{ width: "400px", height: "200px" }}>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label for="cover_url">URL to your image</label>
                  <input
                    type="url"
                    className="form-control"
                    name="newcover"
                    placeholder="Enter URL"
                    value={this.state.newcover}
                    onChange={this.handleChange}
                  />
                  <small id="URLlHelp" className="form-text text-muted">
                    Recommend size: 180px x 1080px
                  </small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSubmit("cover")}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={this.handleCloseModal}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}

export default Profile;
