import React, { Component } from "react";
import Navbar from "./components/common/Navbar";
import Header from "./components/Header";
import Test from "./components/Test";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.props.view
    };
  }

  componentDidUpdate(props) {
    this.setState(props);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <div className="HomePage">
              <Navbar page={props.location.pathname} />
              <Header />
            </div>
          )}
        />
        <Route
          path="/test"
          render={(props) => (
            <div className="TestPage">
              <Navbar page={props.location.pathname} />
              <Header currentPage="test" />
              <Test />
            </div>
          )}
        />
      </Switch>
    );
  }
}

export default App;
