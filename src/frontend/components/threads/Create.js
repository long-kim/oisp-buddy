import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import ReplyForm from "./elements/ReplyForm";
import Axios from "axios";

export class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        content: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(document.getElementById("form"));
    console.log(data.get("content"));
    let content = {};
    data.forEach((value, key) => {
      content[key] = value;
    });
    content.token = localStorage.getItem("oisp-token");

    Axios.post("/api/threads/create", content).then(res => {
      console.log(res);
      // let data = res.data;
      // Axios.post("/api/post/create", { content: content, thread: data }).then(
      //   res => {
      //     console.log(res);
      //   }
      // );
    });
  };

  render() {
    return (
      <Container className="CreateThread">
        <Form id="form" method="POST" onSubmit={this.handleSubmit}>
          <div className="card-wrapper header">
            <h3 className="mr-auto">Create new Thread</h3>
            <Button variant="primary" className="post-btn" type="submit">
              Post
            </Button>
          </div>
          <div className="card-wrapper trans">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Title"
                onChange={this.saveData}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Topics</Form.Label>
              <Select
                name="topics"
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
          </div>
        </Form>
      </Container>
    );
  }
}

export default Create;
