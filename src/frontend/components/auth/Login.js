import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import Axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      isLoading: true,
      error: true,
      username: "",
      password: "",
      auth: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    Axios.post("/auth/login", {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.setState({ auth: true });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.auth && <Redirect to="/forum"></Redirect>}
        <form id="loginfrm" method="POST" onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
