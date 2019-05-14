import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import MiniAva from "./MiniAva.js";

class Friendlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("id"),
      friendlist: [],
      dodai: undefined,
      frId: [],
      ava: [],
      name: [],
      fullname: "",
      idd: undefined,
      avatar: this.props.avatar,
      cover: this.props.cover,
      userFullName: "",
      userMajor: "",
      userYear: ""
    };
    this._renderObject = this._renderObject.bind(this);
  }

  componentDidMount() {
    Axios.get(`/api/users/view`, { user_id: this.state.id }).then(res => {
      this.setState({
        userFullName: res.data.first_name + " " + res.data.last_name,
        userYear: res.data.year,
        userMajor: res.data.dept,
        avatar: res.data.avatar,
        cover: res.data.cover
        // about: res.data.about
      });
    });
    Axios.get("/api/users/friendlist", {
      params: {
        user_id: 2
      }
    }).then(res => {
      this.setState({
        friendlist: res.data
      });
    });
  }

  _renderObject() {
    return Object.keys(this.state.friendlist).map((obj, i) => {
      return (
        <div style={{ width: "100px", margin: "0" }}>
          {/* my friend is:{" "}
          {
            (this.state.idd =
              this.state.friendlist[obj].user_one_id == this.state.id
                ? this.state.friendlist[obj].user_two_id
                : this.state.friendlist[obj].user_one_id)
          } */}
          {/* {Axios.get("api/users/view", { user_id: fr }).then(res => {
            this.setState({
              fullname: res.data.first_name + " " + res.data.last_name
            });
          })}
          User Name = {this.state.fullname} */}
          <MiniAva
            id={
              this.state.friendlist[obj].user_one_id == this.state.id
                ? this.state.friendlist[obj].user_two_id
                : this.state.friendlist[obj].user_one_id
            }
          />
          <hr />
        </div>
      );
    });
  }

  render() {
    // this.state.dodai = Object.keys(this.state.friendlist).length;

    return (
      <div>
        {localStorage.getItem("oisp-token") == null ? (
          <Link to="/login">
            <Button type="button" className="mr-lg-2 mb-2 mb-lg-0">
              Click here to log in first
            </Button>
          </Link>
        ) : (
          // <div>{this.state.friendlist !== [] ? this.state.dodai : "false"}</div>
          <div>
            <header className="header">
              <img src={this.state.cover} alt="user's cover" />
              <h6>
                <button
                  type="button"
                  onClick={() => alert("change this somewhere else please")}
                >
                  <i class="fas fa-pencil-alt" />
                </button>
              </h6>
              <h2 className="user_name">
                {this.state.userFullName} <br />
                <h6>
                  Class of {this.state.userYear} - {this.state.userMajor}
                </h6>
              </h2>
              <button
                className="ava_pencil"
                type="button"
                id="ava"
                onClick={() => {
                  alert("change this somewhere else please");
                }}
              >
                {" "}
                {/* This is for changing the avatar */}
                <i class="fas fa-pencil-alt" />
              </button>
              <div class="polaroid">
                <img src={this.state.avatar} alt="user's avatar" />
              </div>
            </header>
            <body className="info_body">{this._renderObject()}</body>
          </div>
        )}
      </div>
    );
  }
}

export default Friendlist;
