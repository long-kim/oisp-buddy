import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  isAuthenticated = true;
  render() {
    const { component: Component, ...rest } = this.props;
    const token = sessionStorage.getItem("oisp-token");
    return (
      <Route
        {...rest}
        render={props =>
          token !== null ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
