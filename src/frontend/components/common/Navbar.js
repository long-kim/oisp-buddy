import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "assets/img/logo.svg";
import defaultAvatar from "../../../assets/img/avatar-default.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Axios from "axios";
import _ from "lodash";
import Search from "../atoms/Search";
import ExpandButton from "../atoms/ExpandButton";
import UserPopupMenu from "../atoms/UserPopupMenu/User";
import LoginPopupMenu from "../atoms/UserPopupMenu/Login";
import MenuItem from "../atoms/UserPopupMenu/MenuItem";

class PrimaryNav extends Component {
  constructor(props) {
    super(props);
    this.attachRef = target => this.setState({ target });
    this.state = {
      user: undefined,
      show: false,
      menuIsOpen: false
    };
  }

  componentDidMount() {
    if (!_.isUndefined(localStorage.user)) {
      this.setState({ user: JSON.parse(localStorage.user) });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData(document.getElementById("signin-form"));
    const response = await Axios.post("/auth/login", {
      username: form.get("username"),
      password: form.get("password")
    });
    const user_obj = response.data.user_obj;
    const user = {
      firstName: user_obj.first_name,
      user_id: user_obj.user_id,
      username: user_obj.username,
      avatar: user_obj.avatar
    };
    localStorage.setItem("oisp-token", response.data.token);
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ user: user, menuIsOpen: false });
  };

  logOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      Axios.get("/auth/logout").then(res => {
        localStorage.removeItem("oisp-token");
        localStorage.removeItem("user");
        this.setState({ user: undefined, menuIsOpen: false });
      });
    } else {
      this.setState({ menuIsOpen: false });
    }
  };

  renderUser = (user, classes) => {
    if (_.isUndefined(user)) {
      return (
        <LoginPopupMenu avatar={defaultAvatar} onSubmit={this.handleSubmit} />
      );
    } else {
      return (
        <UserPopupMenu
          avatar={this.state.user.avatar}
          cover={`/images/covers/cover-test.png`}
          name={this.state.user.firstName}
        >
          <MenuItem>My Profile</MenuItem>
          <MenuItem>Friends</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem onClick={this.logOut}>Log Out</MenuItem>
        </UserPopupMenu>
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Navbar bg="light" expand="lg" className="sticky-top primary-nav">
        <Link to="/" className="logo">
          <Navbar.Brand style={{ width: "100px", marginRight: "0" }}>
            <img src={logo} className="mr-2" alt="brand" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Search />
          <div className="grow" />
          {this.state.user && (
            <Nav className="subscriptions">
              <ExpandButton className="subs-btn">
                <span className="notification">
                  <i className="fas fa-fw fa-inbox" />
                  <span className="count">0</span>
                </span>
              </ExpandButton>
            </Nav>
          )}
          {this.state.user && (
            <Nav className="message">
              <ExpandButton className="message-btn">
                <span className="notification">
                  <i className="fab fa-fw fa-facebook-messenger" />
                  <span className="count">0</span>
                </span>
              </ExpandButton>
            </Nav>
          )}
          <Nav className="user">{this.renderUser(this.state.user)}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default PrimaryNav;
