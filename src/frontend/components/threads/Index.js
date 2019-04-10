import React, { Component } from "react";
import Overview from "./elements/Overview";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { BrowserRouter as _Router, _Route, Link } from "react-router-dom";
import Axios from "axios";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threads: []
    };
  }

  componentDidMount() {
    return Axios.get("/api/threads/index").then(res =>
      this.setState({ threads: res.data.threads })
    );
  }

  render() {
    return (
      <Container className="index">
        <div className="card-wrapper header">
          <h3 className="mr-auto">Threads</h3>
          <Link className="post-anchor" to={`forum/create`}>
            <Button variant="primary" className="post-btn">
              New
            </Button>
          </Link>
        </div>
        {this.state.threads.map(thread => {
          return (
            <Overview
              thread_id={thread.thread_id}
              score={thread.score}
              title={thread.title}
              key={thread.thread_id}
            />
          );
        })}
      </Container>
    );
  }
}

export default Index;
