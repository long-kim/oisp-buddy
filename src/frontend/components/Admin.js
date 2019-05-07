import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router";
// import "../../assets/css/Admin/header.css";
// import "../../assets/css/Admin/all-skins.css";
// import "../../assets/css/Admin/admin.css";
// import "../../assets/css/Admin/bootstrap.css";
// import "../../assets/css/Admin/ionicons.css";
import Click from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


const mql = window.matchMedia(`(min-width: 800px)`);

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      isLoading: true,
      error: true,
      key: 'home',
    };
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick = () => {
    let temp = this.state.number;
    this.setState({ number: temp + 1 });
  };



  render() {
    return (
      <div>
      
      <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="https://www.youtube.com/watch?v=KdrbBJNFwGw">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Click variant="outline-light" href="https://www.youtube.com/watch?v=KdrbBJNFwGw">Search</Click>
        </Form>
      </Navbar>
      </div>
      <br />
      
      <Tabs
        id="controlled-tab-example"
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}
      >
        <Tab eventKey="home" title="Home">
          <Sonnet />
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <Sonnet />
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          <Sonnet />
        </Tab>
      </Tabs>
      
      </div>
    );
  }
}

export default Admin;
