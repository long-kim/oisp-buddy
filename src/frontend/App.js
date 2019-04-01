import React, { Component } from "react";
import Navbar from "./components/common/Navbar";
import Header from "./components/Header";
import Admin from "./components/Admin";
import Test from "./components/Test";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "assets/styles/scss/main.scss";
import "assets/fonts/Lato/latofonts.css";

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
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <div className="HomePage" itemProp={props}>
              <Navbar setview={this.setView} view="home" />
              <Header />
            </div>
          )}
        />
        <Route
          path="/test"
          render={props => (
            <div className="TestPage" itemProp={props}>
              <Navbar setview={this.setView} view="test" />
              {/* <Header currentPage="test" /> */}
              <Test />
            </div>
          )}
        />
        <Route
          path="/admin"
          render={props => (
            <div className="AdminPage">
              <Navbar setview={this.setView} view="admin" />
              <h2>AdminPage</h2>
              <Admin />
            </div>
          )}
        />
      </Switch>
    );
  }
}

export default App;
