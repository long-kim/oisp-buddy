import React, { Component } from "react";
import logo from "../hcmut.svg";
import "../App.css";
class Header extends Component {
  state = {
    currentPage: "home"
  };

  render() {
    return (
      <div className="Header">
        <header className="App-header">
          <img src={logo} className="App-logo mb-3" alt="logo" />
          <p>
            {this.props.currentPage === "test"
              ? "OISP Buddy Test Page"
              : "Hello World"}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default Header;
