import React, { Component } from "react";
import App from "../App";

class Test extends Component {
  state = {
    response: "",
    post: "",
    reponseToPost: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));

    // App.setState({ currentPage: "test" });
  }

  callApi = async () => {
    const response = await fetch("api/get");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

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
      <div className="Test">
        <form
          className="row d-flex form-group mt-3 test-api mx-auto justify-content-center"
          onSubmit={this.handleSubmit}
        >
          <h2>Post to Server:</h2>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="Send to server"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
          </div>
          <div className="col-md-3 mt-md-0 mt-3">
            <button type="submit" className="btn btn-primary btn-block">
              <i className="fa fa-upload" />
              &nbsp;Submit
            </button>
          </div>
        </form>
        <div className="row d-flex mt-3 mx-auto response test-api justify-content-center">
          <div
            className={
              "alert alert-info " +
              (this.state.reponseToPost !== "" ? "" : "d-none")
            }
            role="alert"
          >
            {this.state.reponseToPost.split("\n").map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
