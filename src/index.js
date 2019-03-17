import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Test from "./components/Test";
import Header from "./components/Header";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "bootstrap";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
    <Switch>
      <Route exact path="/" component={Header} />
      <Route
        path="/test"
        render={() => (
          <div className="TestPage">
            <Header currentPage="test"/>
            <Test />
          </div>
        )}
      />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
