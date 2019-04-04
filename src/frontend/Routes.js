import React, { Component } from "react";
import Navbar from "./components/common/Navbar";
import Header from "./components/Header";
import Admin from "./components/Admin";
import Test from "./components/Test";
import Thread from "./components/threads/Thread";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Page404 from "./components/404";

class Routes extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <div className="HomePage" itemProp={props}>
                <Header />
              </div>
            )}
          />
          <Route
            path="/test"
            render={props => (
              <div className="TestPage" itemProp={props}>
                <Test />
              </div>
            )}
          />
          <Route
            path="/admin"
            render={props => (
              <div className="AdminPage">
                <h2>AdminPage</h2>
                <Admin />
              </div>
            )}
          />
          <Route
            path="/forum"
            render={({ match: { url } }) => (
              <div className="Thread">
                <Route path={`${url}/`} component={Thread.Index} exact />
                <Route path={`${url}/create`} component={Thread.Create} />
              </div>
            )}
          />
          <Route component={Page404} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
