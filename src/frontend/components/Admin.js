import React, { Component } from "react";
<<<<<<< HEAD
//import Axios from "axios";
//import { Redirect } from "react-router";
=======
>>>>>>> ae2d4070bd7864fe18df33c3ac7a275787714e27

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

  handleClick = () => {
    let temp = this.state.number;
    this.setState({ number: temp + 1 });
  };

  render() {
    // const re = this.renderRedirect();
    return (
      <div>
        {/* {re} */}
        <h2>{this.state.number}</h2>
        <button type="button" onClick={this.handleClick}>
          Click me
        </button>
      </div>
    );
  }
}

export default Admin;
