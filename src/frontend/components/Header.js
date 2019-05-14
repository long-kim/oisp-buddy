import React, { Component } from "react";
import logo from "assets/img/hcmut.svg";
import "assets/styles/App.css";
class Header extends Component {
  state = {
    currentPage: ""
  };

  render() {
    return (
      <div className="Header">
        <header className="App-header">
          {/* <img src={logo} className="App-logo mb-3" alt="logo" />
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
          </a> */}
          <h1 className="w3-animate-top">OISP BUDDY Test Page</h1>
        </header>
      </div>
    );
  }
}

export default Header;
