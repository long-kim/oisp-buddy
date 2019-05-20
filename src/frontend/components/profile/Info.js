import React from "react";
import Axios from "axios";
// import * as styles from "./style.css";
import { Redirect } from "react-router-dom";
// import ReactModal from "react-modal";
import Popup from "reactjs-popup";
// import { func } from "prop-types";
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      id: localStorage.getItem("id"),
      name: "",
      about: "",
      avatar: "",
      newavatar: "",
      cover: "",
      newcover: "",
      year: undefined,
      major: "",
      showModal: false,
      showModal2: false,
      first_name: "",
      last_name: "",
      password: "",
      direct: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSubmit_ava = this.handleSubmit_ava.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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

  componentDidMount() {
    Axios.get(`/api/users/view`).then(res => {
      this.setState({
        name: res.data.first_name + " " + res.data.last_name,
        year: res.data.year,
        major: res.data.dept,
        avatar: res.data.avatar,
        cover: res.data.cover,
        about: res.data.about
      });
    });
  }

  handleSubmit = param => e => {
    e.preventDefault();
    return param === "about"
      ? (Axios.patch("/api/users/edit/about", {
          about: this.state.about,
          user_id: this.state.id
        }),
        alert("About has changed"))
      : param === "ava"
      ? (Axios.patch("/api/users/edit/avatar", {
          avatar: this.state.newavatar,
          user_id: this.state.id
        }).then(() => {
          this.setState({
            avatar: this.state.newavatar
          });
        }),
        alert("Avatar has changed"))
      : param === "cover"
      ? (Axios.patch("/api/users/edit/cover", {
          cover: this.state.newcover,
          user_id: this.state.id
        }).then(() => {
          this.setState({
            cover: this.state.newcover
          });
        }),
        alert("Cover has changed"))
      : param === "name"
      ? (Axios.patch("/api/users/edit/name", {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          user_id: this.state.id
        }).then(() => {
          this.setState({
            name: this.state.first_name + " " + this.state.last_name
          });
        }),
        alert("Name has changed"))
      : param === "year"
      ? (Axios.patch("/api/users/edit/year", {
          year: this.state.year,
          user_id: this.state.id
        }),
        alert("Year has changed"))
      : param === "major"
      ? (Axios.patch("/api/users/edit/dept", {
          major: this.state.major,
          user_id: this.state.id
        }),
        alert("Major has changed"))
      : param === "pass"
      ? Axios.patch("/api/users/edit/pass", {
          pass: this.state.password,
          user_id: this.state.id
        }).then(() => {
          Axios.get("/auth/logout").then(res => {
            alert("Password has changed, please login again");
            localStorage.removeItem("oisp-token");
            localStorage.removeItem("id");
            this.setState({
              direct: true
            });
          });
        })
      : "no cant do babydoll";
  };

  render() {
    return (
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
            id="ava"
            onClick={this.handleOpenModal("ava")}
          >
            {" "}
            {/* This is for changing the avatar */}
            <i className="fas fa-pencil-alt" />
          </button>
          <div className="polaroid">
            <img src={this.state.avatar} alt="user's avatar" />
          </div>
        </header>

        <body className="info_body2">
          <div>
            <form onSubmit={this.handleSubmit("about")}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="about">
                    About
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.about}
                  onChange={this.handleChange}
                  name="about"
                  placeholder="no more than 120 characters"
                />
                {/* <input type="submit" value="Save" /> */}
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>

          <div style={{ marginTop: "20px" }}>
            <form id="name" onSubmit={this.handleSubmit("name")}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    First and last name
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                  placeholder="first name"
                />
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                  placeholder="last name"
                />
                {/* <button type="submit">Save</button> */}
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>

          <div style={{ marginTop: "20px" }}>
            <form onSubmit={this.handleSubmit("pass")}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="password">
                    Password
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
                  placeholder="no more than 32 characters"
                />
                {/* <input type="submit" value="Save" /> */}
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>

          <div style={{ marginTop: "20px" }}>
            <form onSubmit={this.handleSubmit("year")}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="year">
                    Entrance Year
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.year}
                  onChange={this.handleChange}
                  name="year"
                  placeholder="year"
                />
                {/* <input type="submit" value="Save" /> */}
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>

          {/* <div style={{ marginTop: "20px" }}>
            <form onSubmit={this.handleSubmit("major")}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="major">
                    Major
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.major}
                  onChange={this.handleChange}
                  name="major"
                  placeholder="major"
                />
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div> */}

          <div style={{ marginTop: "20px" }}>
            <form onSubmit={this.handleSubmit("major")}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="major">
                    Major
                  </span>
                </div>
                <select
                  value={this.state.major}
                  onChange={this.handleChange}
                  name="major"
                  className="form-control"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Computer Engineering">
                    Computer Engineering
                  </option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="F. Mechanical Engineering">
                    F. Mechanical Engineering{" "}
                  </option>
                  <option value="Chemical Engineering">
                    Chemical Engineering
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Food Engineering">Food Engineering</option>
                  <option value="Geo&Petro Engineering">
                    Geo&Petro Engineering
                  </option>
                  <option value="Environmental Engineering">
                    Environmental Engineering
                  </option>
                  <option value="Cars Engineering">Cars Engineering</option>
                  <option value="Industrial Management">
                    Industrial Management
                  </option>
                </select>
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </body>

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
                  onClick={this.handleSubmit("ava")}
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
        {this.state.direct ? <Redirect to="/login" /> : null}
      </div>
    );
  }
}

export default Info;
