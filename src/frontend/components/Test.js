import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ReplyForm from "./threads/ReplyForm";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      post: "",
      reponseToPost: "",
    };
  }

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
      <Container className="Test">
        {/* <Form
          className="row d-flex mt-3 test-api mx-auto justify-content-center"
          onSubmit={this.handleSubmit}
        >
          <h2>Post to Server:</h2>
          <Col md={9}>
            <Form.Control
              type="text"
              placeholder="Send to server"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
          </Col>
          <Col md={3} className="mt-md-0 mt-3">
            <Button type="submit" variant="primary" block>
              <i className="fa fa-upload" />
              &nbsp;Submit
            </Button>
          </Col>
        </Form>
        <Row className="d-flex mt-3 mx-auto response test-api justify-content-center">
          <Alert
            variant="info"
            dismissible
            className={this.state.reponseToPost !== "" ? "" : "d-none"}
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
          </Alert>
        </Row> */}
        <Row>
            <ReplyForm />
        </Row>
      </Container>
    );
  }
}

export default Test;
