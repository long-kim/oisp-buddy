import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import NavbarUser from "./NavbarUser";
import NavbarGuest from "./NavbarGuest";

class PrimaryNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }

  logOut = () => {
    axios.get("/auth/logout").then(res => {
      localStorage.removeItem("oisp-token");
      localStorage.removeItem("user_id");
      console.log(res);
      this.setState({ isLoggedIn: false });
    });
  };

  render() {
    return this.state.isLoggedIn ? <NavbarUser /> : <NavbarGuest />;
  }
}

export default PrimaryNav;
