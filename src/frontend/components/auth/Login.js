import React, { Component } from "react";
import { Redirect } from "react-router";
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

  handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData(document.getElementById("loginfrm"));
    const response = await Axios.post("/auth/login", {
      username: form.get("username"),
      password: form.get("password")
    });
    const user_obj = response.data.user_obj;
    const user = {
      firstName: user_obj.first_name,
      user_id: user_obj.user_id,
      username: user_obj.username,
      avatar: user_obj.avatar
    };
    localStorage.setItem("oisp-token", response.data.token);
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ redirectToReferrer: true });
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
