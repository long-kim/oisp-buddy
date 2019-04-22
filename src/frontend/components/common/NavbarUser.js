import React, { Component } from "react";
import logo from "../../../assets/img/buddy.svg";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Chat from "frontend/components/chat/Chat.js";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";

// const InputBox = styled.input`
//   display: ${({ clicked }) => (clicked ? "block" : "none")};
// `;

// library.add(faStroopwafel)

class NavbarUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messPopUp: "none"
    };
  }

  onClickMessPopUp = () => {
    if (this.state.messPopUp === "none") {
      this.setState({ messPopUp: "block" });
    } else {
      this.setState({ messPopUp: "none" });
    }
  };

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg" className="sticky-top primary-nav">
          <Link to="/">
            <Navbar.Brand>
              <img
                src={logo}
                // width="30"
                // height="30"
                className="d-inline-block align-top mr-2"
                alt=""
              />
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
              <Nav.Link href="#">Link</Nav.Link>
              <NavDropdown title="Topic">
                <NavDropdown.Item href="#">Acion</NavDropdown.Item>
                <NavDropdown.Item href="#">Another Action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Something else here</NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
                <NavLink
                  className="nav-link"
                  to="/test"
                  activeClassName="active"
                >
                  Test Page
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
              {/* <Link to="/chat"> */}
              <Button
                type="button"
                variant="secondary"
                className="mr-lg-2 mb-2 mb-lg-0"
                onClick={this.onClickMessPopUp}
              >
                <FontAwesomeIcon icon={faFacebookMessenger} color="white" />
              </Button>
              {/* </Link> */}

              <Link to="/login">
                <Button
                  type="button"
                  variant="secondary"
                  className="mr-lg-2 mb-2 mb-lg-0"
                >
                  Log Out
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Chat style_props={{ display: this.state.messPopUp }} />
      </div>
    );
  }
}

export default NavbarUser;