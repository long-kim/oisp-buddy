import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "assets/img/logo.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import _ from "lodash";

class HomeNav extends Component {
  constructor(props) {
    super(props);
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

  getActive = hash => {
    let current = this.props.location.hash;
    if (current === "") {
      current = "#home";
    }
    if (current === hash) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <Navbar bg="light" expand="lg" className="home-nav primary-nav">
        <Link to="/" className="logo">
          <Navbar.Brand style={{ width: "100px", marginRight: "0" }}>
            <img src={logo} className="mr-2" alt="brand" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="home-anchor ml-auto">
            <Nav.Link href="#home" active={this.getActive("#home")}>
              Home
            </Nav.Link>
            <Nav.Link href="#about" active={this.getActive("#about")}>
              About us
            </Nav.Link>
            <Nav.Link href="#features" active={this.getActive("#features")}>
              Features
            </Nav.Link>
            <Nav.Link href="#contact" active={this.getActive("#contact")}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HomeNav;
