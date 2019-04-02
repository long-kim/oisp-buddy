import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import ReplyForm from "./ReplyForm";

class CreateThread extends Component {
  render() {
    return (
      <Container className="CreateThread">
        <div className="card-wrapper sticky-top">
          <h3 className="mr-auto">Create new Thread</h3>
          <Button variant="primary" className="post-btn">
            Post
          </Button>
        </div>
        <div className="card-wrapper trans">
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Topics</Form.Label>
              <Select
                closeMenuOnSelect={true}
                className="select"
                classNamePrefix="select"
                components={makeAnimated()}
                isMulti
                placeholder="Choose your topics"
                onMenuClose
                options={[
                  { value: "dog", label: "Dog" },
                  { value: "cat", label: "Cat" }
                ]}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <ReplyForm />
            </Form.Group>
          </Form>
        </div>
      </Container>
    );
  }
}

export default CreateThread;
