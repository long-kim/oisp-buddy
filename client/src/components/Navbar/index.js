import React, { Component } from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import UserPopupMenu from "../../components/forum/UserPopupMenu/User";
import MenuItem from "../../components/forum/UserPopupMenu/MenuItem";
import FriendRequest from "./FriendRequest";
import Chat from "../chat";
import UserContext from "../UserContext";

import logo from "../../assets/ui-elements/logo.svg";
import defaultAvatar from "../../assets/images/avatar-default.svg";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  brand: {
    filter: "drop-shadow(0 0 1px #999)",
    width: 100,
    objectFit: "cover"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.secondary["900"],
    width: 700,
    marginLeft: "calc(50% - 454px)",
    height: 40
  },
  searchIcon: {
    width: theme.spacing.unit * 7,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  colorSecondary: {
    color: theme.palette.secondary["500"]
  },
  inputRoot: {
    color: "inherit",
    height: 40,
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 7
  },
  sectionDesktop: {
    display: "flex"
  },
  icon: {
    width: 48,
    marginRight: 5
  },
  link: {
    textDecoration: "none"
  }
});

class Navbar extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      user: context.currentUser
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <UserContext.Consumer>
        {({ currentUser, logOut }) => (
          <AppBar
            position="sticky"
            color="secondary"
            classes={{ root: classes.root }}
          >
            <Toolbar className={classes.toolbar}>
              <Link to="/">
                <img
                  src={logo}
                  className={classes.brand}
                  alt="OISP Buddy Logo"
                />
              </Link>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon
                    fontSize="small"
                    color="secondary"
                    classes={{
                      colorSecondary: classes.colorSecondary
                    }}
                  />
                </div>
                <InputBase
                  placeholder="search something here"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Chat />
                <FriendRequest />
                <UserPopupMenu
                  avatar={
                    currentUser.avatar !== null && currentUser.avatar !== ""
                      ? currentUser.avatar
                      : defaultAvatar
                  }
                  cover={currentUser.cover}
                  name={currentUser !== null && currentUser.firstName}
                >
                  <Link
                    to={`/profile/${currentUser.user_id}`}
                    className={classes.link}
                  >
                    <MenuItem>My Profile</MenuItem>
                  </Link>
                  <MenuItem>Friends</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem logout>Log Out</MenuItem>
                </UserPopupMenu>
              </div>
            </Toolbar>
          </AppBar>
        )}
      </UserContext.Consumer>
    );
  }
}

const StyledNavbar = injectSheet(styles)(Navbar);
Navbar.contextType = UserContext;

export default StyledNavbar;
