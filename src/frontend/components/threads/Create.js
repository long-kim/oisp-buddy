import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import makeAnimated from "react-select/lib/animated";
import AsyncSelect from "react-select/lib/Async";
import ReplyForm from "./elements/ReplyForm";
import Axios from "axios";
import cover from "assets/img/thread-default-cover.jpg";

export class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        content: ""
      },
      input: ""
    };
  }

  loadOptions = inputValue => {
    return Axios.get(`/api/topics/find?input=${inputValue}`).then(response => {
      const options = response.data.map(option => {
        return {
          value: option.name,
          label: option.title
        };
      });
      console.log(options);
      return options;
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(document.getElementById("form"));
    console.log(data.get("content"));
    let content = {};
    data.forEach((value, key) => {
      content[key] = value;
    });

    Axios.post("/api/threads/create", content, {
      headers: { Authorization: `Bearer ` + localStorage.getItem("oisp-token") }
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <Container className="CreateThread">
        <Form id="form" method="POST" onSubmit={this.handleSubmit}>
          <div
            className="forum-header"
            style={{ backgroundImage: `url(${cover})` }}
          >
            <div className="title-wrapper">
              <Form.Control
                name="title"
                type="text"
                placeholder="Click here to set title"
                onChange={this.saveData}
                className="title"
              />
              {/* <h1 className="title">{this.state.title}</h1> */}
              <div className="post-count-wrapper">
                <div className="post-count">
                  <div className="inner-wrapper">
                    Total Posts
                    <span>1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card-wrapper header sticky">
            <h3 className="mr-auto">Create new Thread</h3>
            <Button variant="primary" className="post-btn" type="submit">
              Post
            </Button>
          </div> */}
          <div
            className="card-wrapper trans"
            style={{ flexDirection: "column", marginBottom: 0, minHeight: `calc(100vh - 260px)` }}
          >
            <Form.Group>
              <Form.Label>Topics</Form.Label>
              <AsyncSelect
                name="topics"
                closeMenuOnSelect={true}
                className="select"
                classNamePrefix="select"
                components={makeAnimated()}
                isMulti
                placeholder="Choose your topics"
                loadOptions={this.loadOptions}
                cacheOptions
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <ReplyForm createThread={true} />
            </Form.Group>
          </div>
        </Form>
      </Container>
    );
  }
}

export default Create;
