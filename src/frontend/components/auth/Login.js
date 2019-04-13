import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import Axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirectToReferrer: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = new FormData(document.getElementById("loginfrm"));
    Axios.post("/auth/login", {
      username: form.get("username"),
      password: form.get("password")
    }).then(res => {
      console.log(res);
      localStorage.setItem("oisp-token", res.data.token);
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || {
      from: { pathname: "/" }
    };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <form id="loginfrm" method="POST" onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input type="text" name="username" />
          <label>Password</label>
          <input type="password" name="password" />
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
