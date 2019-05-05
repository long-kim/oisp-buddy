import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/img/hcmut.svg";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Axios from "axios"; 
const jwt = require("jsonwebtoken");

class PrimaryNav extends Component {
  constructor(props){
    super(props);
    this.state = {
       isLogIn: localStorage.getItem("oisp-token")
    }
    this.handleButton = this.handleButton.bind(this)
    
  }

  // click = () => {
  //   this.props.checkLogIn()
  // }
  componentDidUpdate(prevProps){
    if (this.props.isLogIn !== prevProps.isLogIn){
      this.setState({ isLogIn: this.props.isLogIn})
    }
    console.log("OK");
  }

  logOut = () => {
    Axios.get("/auth/logout").then(res => {
      window.location.reload();
      localStorage.removeItem("oisp-token");
      localStorage.removeItem("user_id");
    });
    this.setState(
      {isLogin: null},
    //() => console.log(this.state)
    );
  };

  

  handleButton(){
    this.setState={
      isLogIn: !null
      }
  }
    // window.location.reload()
  
  render() {
    let button
    return (
      <Navbar bg="light" expand="lg" className="sticky-top primary-nav">
        <Link to="/">
          <Navbar.Brand>
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top mr-2"
              alt=""
            />
            Buddy
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <NavLink to="/" activeClassName="active" className="nav-link">
                Home
              </NavLink>
            </Nav.Item>
            {/* <NavLink className = "nav-link" to ="/profile" activeClassName="active">Profile</NavLink> */}
            <Nav.Link href="#">Link</Nav.Link>
            <NavDropdown title="Topic">
              <NavDropdown.Item href="#">Acion</NavDropdown.Item>
              <NavDropdown.Item href="#">Another Action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Something else here</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <NavLink className="nav-link" to="/test" activeClassName="active"> 
                {this.props.isLogInn? "in" : "out"}                  
              </NavLink>
            </Nav.Item>
            <Form inline className="my-2 my-lg-0">
              <InputGroup>
                <FormControl type="text" placeholder="Search" />
                <DropdownButton
                  as={InputGroup.Append}
                  variant="info"
                  title="More"
                >
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Separated link</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Form>
          </Nav>
          <Nav>

            {/* <Link to="/login">
              <Button
                type="button"
                variant="secondary"
                className="mr-lg-2 mb-2 mb-lg-0"
              >
                Sign In
              </Button>
            </Link>

            <Button type="button" variant="primary" onClick={this.logOut}>
              Sign Up
            </Button>
            <Link to="/">
              <Button style = {this.isLogIn? display = "none": }
                type = "button"
                variant="primary"
                onClick={this.logOut}>
                Log Out
              </Button>
            </Link> */}
            {localStorage.getItem("oisp-token")!= null? 
              <Link to = "/profile">
                <Button
                  variant="secondary"
                  className="mr-lg-2 mb-2 mb-lg-0">
                <i class="fas fa-user"></i>
                </Button>
              </Link>: null}

            {this.state.isLogIn !== null?
              <Link to="/" >
                <Button 
                  type = "button"
                  variant="primary"
                  onClick={this.logOut}
                >
                  Log Out
                </Button>
              </Link>
              :
              <Link to="/login" >
                <Button
                  type="button"
                  variant="secondary"
                  className="mr-lg-2 mb-2 mb-lg-0"
                  onClick={this.handleButton}
                >
                  Sign In
                </Button>
              </Link> }
              

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

// function LogInButton(props){
//   return(
//     <Link to="/login">
//       <Button
//         type="button"
//         variant="secondary"
//         className="mr-lg-2 mb-2 mb-lg-0"
//         >
//          Sign In
//       </Button>
//     </Link>
//   )
// }

// function LogOutButton(props){
//   return(
//     <Link to="/">
//         <Button>
//           type = "button"
//           variant="primary"
//           onClick={PrimaryNav.logOut}
//           >
//             Log Out
//         </Button>
//     </Link>
//   )
// }

export default PrimaryNav;
