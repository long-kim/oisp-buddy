import React, { Component } from "react";
import { BrowserRouter as _Router, _Route, Link } from "react-router-dom";
import logo from "../../hcmut.svg";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  setActive(route) {
    return this.props.page.substring(1) === route ? "active" : "";
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top mr-2"
            alt=""
          />
          Buddy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={"nav-item " + this.setActive("")}>
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Topic
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li className={"nav-item " + this.setActive("test")}>
              <Link className="nav-link" to="/test">
                Test Page
              </Link>
            </li>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </ul>

          <button type="button" className="btn btn-outline-secondary mr-2">
            Log in
          </button>

          <button type="button" className="btn btn-primary mr-3">
            Sign Up
          </button>
        </div>

        {/* <a class="navbar-brand" href="#">
          <img
            src={logo}
            width="30"
            height="30"
            class="d-inline-block align-top "
            alt=""
          />
        </a> */}
      </nav>
    );
  }
}

export default Navbar;
