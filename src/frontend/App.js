import React, { Component } from "react";
import Routes from "frontend/Routes";
import "assets/styles/scss/main.scss";
import "assets/fonts/Lato/latofonts.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }

  getAuth = () => {
    return this.state.auth;
  }

  setAuth = () => {
    this.setState({auth: true});
  }

  render() {
    return <Routes />;
  }
}

export default App;
