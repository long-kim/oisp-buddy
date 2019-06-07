import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Forum from "./pages/forum";
import Profile from "./pages/profile";
import Page404 from "./pages/404";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forum" component={Forum} />
      <Route path="/profile/:userId" component={Profile} />
      <Route component={Page404} />
    </Switch>
  );
}

export default Routes;
