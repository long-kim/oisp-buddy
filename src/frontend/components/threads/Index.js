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
          <Link className="post-anchor" to={`./create`}>
            <Button variant="primary" className="post-btn">
              New
            </Button>
          </Link>
        </div>
        <Overview post_id="1" score={2} />
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
