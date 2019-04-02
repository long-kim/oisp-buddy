import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class CreateThread extends Component {
  render() {
    return (
      <Container className="CreateThread">
        <div className="card-wrapper">
          <h3 className="mr-auto">Create new Thread</h3>
          <Button variant="primary" className="post-btn">
            Post
          </Button>
        </div>
        <div className="card-wrapper">
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Topics</Form.Label>
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>
          </Form>
        </div>
      </Container>
    );
  }
}

export default CreateThread;
