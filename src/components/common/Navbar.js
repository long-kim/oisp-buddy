import React, { Component } from "react";
import logo from "../../hcmut.svg";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src={logo}
            width="30"
            height="30"
            class="d-inline-block align-top mr-2"
            alt=""
          />
          Buddy
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Topic
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <div class="dropdown-divider" />
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>

            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </ul>

          <button type="button" class="btn btn-outline-secondary mr-2">
            Log in
          </button>

          <button type="button" class="btn btn-primary mr-3">
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
