import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false
    };
  }

  render() {
    return (
      <Nav className="search">
        <div
          className={`search-wrapper ${
            this.state.isFocused ? "focused" : ""
          }`}
          id="search-wrapper"
        >
          <span className="search-icon">
            <i className="fas fa-search fa-flip-horizontal" />
          </span>
          <Form inline className="my-2 my-lg-0">
            <Form.Control
              type="text"
              placeholder="search something here"
              className="search"
              onFocus={() => {
                this.setState({ isFocused: true });
              }}
              onBlur={() => {
                this.setState({ isFocused: false });
              }}
            />
          </Form>
        </div>
      </Nav>
    );
  }
}

export default Search;
