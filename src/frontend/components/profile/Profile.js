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
      toggle: false,
      // idd: localStorage.getItem("id"),
      id: localStorage.getItem("id"), // lay id tu token
      test: "",
      newavatar: "",
      newcover: "",
      showModal: false,
      showModal2: false,
      friendlist: []
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleButton() {
    this.setState(prevState => {
      return {
        toggle: !prevState.toggle
      };
    });
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
                  <i class="fas fa-pencil-alt" />
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
                <i class="fas fa-pencil-alt" />
              </button>
              <div class="polaroid">
                <img src={this.state.avatar} alt="user's avatar" />

                <div class="container">
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
                      <Link to="forum">THREAD</Link>
                    </h7>{" "}
                    <h7 style={{ float: "right" }}>{this.state.thread}</h7>{" "}
                    <br />
                    <h7 style={{ float: "left" }}>ACHIVEMENT</h7>{" "}
                    <h7 style={{ float: "right" }}>{this.state.achivement}</h7>
                    <br />
                  </p>
                </div>
              </div>
            </header>

            <div className="calendar">
              <Button variant="contained" onClick={this.handleButton}>
                {this.state.toggle ? "Close Calendar" : "Open Calendar"}
              </Button>{" "}
              {this.state.toggle ? (
                <Calendar onClickDay={() => alert("nothing yet")} />
              ) : null}
              {this.state.id == null ? "not log in" : this.state.test}
            </div>
          </div>
        )}
        <Popup
          open={this.state.showModal}
          modal
          onClose={this.handleCloseModal}
        >
          <div class="card" style={{ width: "400px", height: "200px" }}>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label for="ava_url">URL to your image</label>
                  <input
                    type="url"
                    class="form-control"
                    name="newavatar"
                    placeholder="Enter URL"
                    value={this.state.newavatar}
                    onChange={this.handleChange}
                  />
                  <small id="URLlHelp" class="form-text text-muted">
                    Recommend size: 290px x 400px
                  </small>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={this.handleSubmit("avatar").bind(this)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="btn"
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
          <div class="card" style={{ width: "400px", height: "200px" }}>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label for="cover_url">URL to your image</label>
                  <input
                    type="url"
                    class="form-control"
                    name="newcover"
                    placeholder="Enter URL"
                    value={this.state.newcover}
                    onChange={this.handleChange}
                  />
                  <small id="URLlHelp" class="form-text text-muted">
                    Recommend size: 180px x 1080px
                  </small>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={this.handleSubmit("cover")}
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="btn"
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
