import React, { Component } from "react";
import Overview from "./elements/Overview";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { BrowserRouter as _Router, _Route, Link } from "react-router-dom";

class Index extends Component {
  render() {
    return (
      <Container className="index">
        <div className="card-wrapper header">
          <h3 className="mr-auto">Threads</h3>
          <Link className="post-anchor" to={`${this.props.match.url}/create`}>
            <Button variant="primary" className="post-btn">
              Post
            </Button>
          </Link>
        </div>
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
        <Overview />
      </Container>
    );
  }
}

export default Index;
