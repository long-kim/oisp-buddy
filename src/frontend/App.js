import React, { Component } from "react";
import Routes from "frontend/Routes";
import "assets/styles/scss/main.scss";
import "assets/fonts/Lato/latofonts.css";
import Navbar from "react-bootstrap/Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ""
    };
  }

  setView = view => {
    this.setState({ view: view });
  };

  render() {
    return <Routes />;
  }
}

export default App;
