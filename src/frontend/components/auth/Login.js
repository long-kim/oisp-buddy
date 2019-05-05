import React, { Component } from "react";
import { Redirect } from "react-router";
import Axios from "axios";
import { Link, NavLink } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirectToReferrer: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = new FormData(document.getElementById("loginfrm"));
    Axios.post("/auth/login", {
      username: form.get("username"),
      password: form.get("password")
    }).then(res => {
      localStorage.setItem("oisp-token", res.data.token);
      // localStorage.setItem("userdb", res.data.json);
      window.location.reload();
      this.setState({ redirectToReferrer: true});
      
    });
  };

  render() {
    let { from } = this.props.location.state || {
      from: { pathname: "/profile" }
    };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;
    
    return (
      <div>
        {localStorage.getItem("oisp-token") == null? <form id="loginfrm" method="POST" onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input type="text" name="username" />
          <label>Password</label>
          <input type="password" name="password" />
          <button type="submit">Log in</button>
          {this.state.redirectToReferrer? "true" : "false"}
          
          
        </form> : <Redirect to={from} />}
      </div>
    );
  }
}

export default Login;
