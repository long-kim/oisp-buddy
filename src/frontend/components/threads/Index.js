import React, { Component } from "react";
import Overview from "./elements/Overview";
import Container from "react-bootstrap/Container";

class Index extends Component {
  render() {
    return (
      <Container className="index">
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
