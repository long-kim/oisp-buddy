import React, { Component } from "react";
import { createMuiTheme, withTheme } from "@material-ui/core/styles";
import brown from "@material-ui/core/colors/brown";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link, Redirect } from "react-router-dom";
import logo from "assets/img/logo.svg";
import defaultAvatar from "../../../assets/img/avatar-default.svg";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Tooltip from "react-bootstrap/Tooltip";
import Popup from "reactjs-popup";
import Axios from "axios";
import _ from "lodash";
import Overlay from "react-bootstrap/Overlay";
import Search from "../atoms/Search";
import ExpandButton from "../atoms/ExpandButton";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    objectFit: "contain",
    maxHeight: "100%"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    backgroundColor: theme.palette.primary[200],
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "calc((100% - 840px) / 2)",
      width: "600px"
    }
  },
  searchIcon: {
    color: theme.palette.primary[500],
    width: theme.spacing.unit * 7,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    transition: "all 0.3s"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 7,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  inputFocused: {
    background: theme.palette.primary[50],
    boxShadow: `0 1px 1px 0 rgba(65, 69, 73, 0.3),
            0 1px 3px 1px rgba(65, 69, 73, 0.15)`
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  navBtn: {
    color: theme.palette.primary[600]
  },
  badge: {
    backgroundColor: theme.palette.secondary[500]
  }
});

class PrimaryNav extends Component {
  constructor(props) {
    super(props);
    this.attachRef = target => this.setState({ target });
    this.state = {
      user: undefined,
      show: false,
      menuIsOpen: false
    };
  }

  componentDidMount() {
    if (!_.isUndefined(localStorage.user)) {
      this.setState({ user: JSON.parse(localStorage.user) });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData(document.getElementById("signin-form"));
    const response = await Axios.post("/auth/login", {
      username: form.get("username"),
      password: form.get("password")
    });
    const user_obj = response.data.user_obj;
    const user = {
      firstName: user_obj.first_name,
      user_id: user_obj.user_id,
      username: user_obj.username,
      avatar: user_obj.avatar
    };
    localStorage.setItem("oisp-token", response.data.token);
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ user: user, menuIsOpen: false });
  };

  handleSearchFocus = () => {
    const search = document.getElementById("search-wrapper");
    search.classList.add("focused");
  };

  handleSearchBlur = () => {
    const search = document.getElementById("search-wrapper");
    search.classList.remove("focused");
  };

  logOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      Axios.get("/auth/logout").then(res => {
        localStorage.removeItem("oisp-token");
        localStorage.removeItem("user");
        this.setState({ user: undefined, menuIsOpen: false });
      });
    } else {
      this.setState({ menuIsOpen: false });
    }
  };

  renderUser = user => {
    if (_.isUndefined(user)) {
      return (
        <div className="user-info">
          <Popup
            ref={this.attachRef}
            trigger={
              <img
                src={defaultAvatar}
                alt="avatar"
                onMouseEnter={() => {
                  this.setState({ show: true });
                }}
                onMouseLeave={() => {
                  this.setState({ show: false });
                }}
              />
            }
            arrow={false}
            offsetY={15}
            position="bottom right"
            open={this.state.menuIsOpen}
            onOpen={() => {
              this.setState({ menuIsOpen: true });
            }}
            onClose={() => {
              this.setState({ menuIsOpen: false });
            }}
          >
            <Form id="signin-form" method="POST" onSubmit={this.handleSubmit}>
              <h4>Sign in to proceed</h4>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="username"
                  name="username"
                />
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                />
                <div className="reset-password">
                  <a href="/password/reset">Forgot Password?</a>
                </div>
                <Button type="submit">
                  <span>Log In</span>
                  <span className="float-right">
                    <i className="fas fa-fw fa-sign-in-alt" />
                  </span>
                </Button>
              </Form.Group>
            </Form>
            <div className="register-user">
              <h4>Don't have an account?</h4>
              <p>
                You need an account to use our site. Why don't you create one?
              </p>
              <Button>
                <span>Register</span>
                <span className="float-right">
                  <i className="fas fa-fw fa-user-plus" />
                </span>
              </Button>
            </div>
          </Popup>
          <Overlay
            target={this.state.target}
            placement="bottom"
            show={this.state.show}
          >
            <Tooltip>Click to sign in</Tooltip>
          </Overlay>
        </div>
      );
    } else {
      return (
        <div className="user-info logged-in">
          <Popup
            trigger={
              <img
                className="avatar"
                src={this.state.user.avatar}
                alt="avatar"
                onMouseEnter={() => {
                  this.setState({ show: true });
                }}
              />
            }
            arrow={false}
            offsetY={15}
            position="bottom right"
            open={this.state.menuIsOpen}
            onOpen={() => {
              this.setState({ menuIsOpen: true });
            }}
            onClose={() => {
              this.setState({ menuIsOpen: false });
            }}
          >
            <Link className="cover-image" to="/user/1">
              <img
                className="cover-img"
                src="/images/covers/cover-test.png"
                alt=""
              />
            </Link>
            <div className="user-dashboard">
              <img
                className="avatar-inner"
                src={this.state.user.avatar}
                alt="avatar"
              />
              <h5 className="username">{this.state.user.firstName}</h5>
            </div>
            <ul className="user-menu">
              <div className="control">
                <li className="control">My Profile</li>
              </div>
              <div className="control">
                <li className="control">Friends</li>
              </div>
              <div className="control">
                <li className="control">Settings</li>
              </div>
              <div className="control">
                <li className="control" onClick={this.logOut}>
                  Log out
                </li>
              </div>
            </ul>
          </Popup>
        </div>
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <img src={logo} className={classes.logo} alt="brand" />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="search something here"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                  focused: classes.inputFocused
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                color="primary"
                classes={{ colorPrimary: classes.navBtn }}
              >
                <Badge
                  badgeContent={4}
                  color="secondary"
                  classes={{
                    badge: classes.badge
                  }}
                >
                  <InboxIcon />
                </Badge>
              </IconButton>
              <IconButton
                color="primary"
                classes={{ colorPrimary: classes.navBtn }}
              >
                <Badge
                  badgeContent={17}
                  color="secondary"
                  classes={{
                    badge: classes.badge
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      // <Navbar bg="light" expand="lg" className="sticky-top primary-nav">
      //   <Link to="/" className="logo">
      //     <Navbar.Brand style={{ width: "100px", marginRight: "0" }}>
      //       <img src={logo} className="mr-2" alt="brand" />
      //     </Navbar.Brand>
      //   </Link>
      //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
      //   <Navbar.Collapse id="basic-navbar-nav">
      //     <Search />
      //     <Nav className="create-post mr-auto">
      //       <Link to="/forum/create">
      //         <span className="label">
      //           <i className="fas fa-plus" />
      //           New Thread
      //         </span>
      //       </Link>
      //     </Nav>
      //     {this.state.user && (
      //       <Nav className="subscriptions">
      //         <ExpandButton className="subs-btn">
      //           <span className="notification">
      //             <i className="fas fa-fw fa-inbox" />
      //             <span className="count">0</span>
      //           </span>
      //         </ExpandButton>
      //       </Nav>
      //     )}
      //     {this.state.user && (
      //       <Nav className="message">
      //         <ExpandButton className="message-btn">
      //           <span className="notification">
      //             <i className="fab fa-fw fa-facebook-messenger" />
      //             <span className="count">0</span>
      //           </span>
      //         </ExpandButton>
      //       </Nav>
      //     )}
      //     <Nav className="user">{this.renderUser(this.state.user)}</Nav>
      //   </Navbar.Collapse>
      // </Navbar>
    );
  }
}

export default withStyles(styles)(PrimaryNav);
