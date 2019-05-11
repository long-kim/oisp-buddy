import React, { Component } from "react";
import Navbar from "./components/common/Navbar";
import HomeNav from "./components/common/HomeNav";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Thread from "./components/threads/Thread";
import { Route, Switch, Redirect } from "react-router-dom";
import Page404 from "./components/404";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import ChatBox from "./components/chat/ChatBox";
import _ from "lodash";

class Routes extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <div className="HomePage">
                <HomeNav {...props} />
                <Home />
              </div>
            )}
          />
          <Route path="/login" render={props => <Login {...props} />} />
          <Route path="/chat" component={ChatBox} />
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
                <Navbar />
                <PrivateRoute
                  path={`${url}/index`}
                  component={Thread.Index}
                  exact
                />
                <PrivateRoute
                  path={`${url}/create`}
                  component={Thread.Create}
                />
                <PrivateRoute
                  path={`${url}/thread/:threadId`}
                  component={Thread}
                />
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
