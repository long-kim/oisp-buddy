import React, { Component } from "react";
import CreateThread from "./threads/Create";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      post: "",
      reponseToPost: "",
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    });

    const body = await response.text();

    this.setState({ reponseToPost: body });
  };

  render() {
    return (
      <CreateThread />
    );
  }
}

export default Test;
