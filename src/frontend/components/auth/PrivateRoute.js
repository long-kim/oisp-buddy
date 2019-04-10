import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import Axios from "axios";

class PrivateRoute extends Component {
  constructor({ component: Component, ...rest }) {
    super({ component: Component, ...rest });
    this.state = {
      auth: false
    };
  }

  getResponse = async () => {
    const response = await Axios.get("/auth");
    return await response;
  };

  componentWillMount() {
    // this.getResponse().then(res => {
    //   if (res.status === 200) {
    //     this.setState({ auth: true });
    //   }
    // });
  }

  render() {
    const { Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (this.state.auth === true) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
        }}
      />
    );
  }
}

export default PrivateRoute;
