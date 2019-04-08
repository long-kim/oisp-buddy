import React, { Component } from "react";
import Axios from "axios";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      isLoading: true,
      error: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const access = localStorage.getItem("JWT");
    console.log(access);
    await Axios.get("/auth/current", {
      params: {
        username: "longkh"
      },
      header: {
        Authorization: `JWT ${access}`
      }
    }).then(res => {
      console.log(res);
    });
  }

  handleClick = () => {
    let temp = this.state.number;
    this.setState({ number: temp + 1 });
  };

  render() {
    return (
      <div>
        <h2>{this.state.number}</h2>
        <button type="button" onClick={this.handleClick}>
          Click me
        </button>
      </div>
    );
  }
}

export default Admin;
