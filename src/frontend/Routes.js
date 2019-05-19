import React, { Component } from "react";
import Navbar from "./components/common/Navbar";
import Header from "./components/Header";
import Admin from "./components/Admin";
import Test from "./components/Test";
import Thread from "./components/threads/Thread";
import { Route, Switch } from "react-router-dom";
import Page404 from "./components/404";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import ChatBox from "./components/chat/ChatBox";

import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Redirect } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

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
          <Route path="/login" render={props => <Login {...props} />} />
          <Route path="/chat" component={ChatBox} />
          <Route
            path="/test"
            render={props => (
              <div className="TestPage" itemProp={props}>
                <Test />
              </div>
            )}
          />
          {/* <Route
            path="/admin"
            render={props => (
              <div className="AdminPage">
                <Admin />
                
              </div>
            )}
          /> */}
          <Route path="/admin" component={Admin} />
          
          <PrivateRoute
            path="/secret"
            component={Admin}
            auth={this.props.auth}
          />

          <Route
            path="/forum"
            render={({ match: { url } }) => (
              <div className="Thread">
                <Route path={`${url}/`} component={Thread.Index} exact />
                <Route path={`${url}/create`} component={Thread.Create} />
                <Route path={`${url}/thread/:threadId`} component={Thread} />
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
