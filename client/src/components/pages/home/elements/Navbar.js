import React, { Component } from "react";
import { Link } from "react-scroll";
import injectSheet from "react-jss";
import Color from "color";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Hidden } from "@material-ui/core";

import logo from "../../../../assets/ui-elements/logo.svg";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: Color("white")
      .fade(0.25)
      .string()
  },
  grow: {
    flexGrow: 1
  }
};

function NavTab(props) {
  return (
    <Tab
      component={Link}
      smooth="easeInOutQuad"
      {...props}
      className="nav-tab"
      disableRipple
    />
  );
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ currentPage: value });
  };

  render() {
    const page = this.state.currentPage;
    const { classes } = this.props;
    return (
      <AppBar
        position="sticky"
        color="default"
        classes={{ root: classes.root }}
      >
        <Toolbar>
          <Hidden xsDown>
            <img src={logo} />
          </Hidden>
          <div className={classes.grow} />
          <Tabs value={page} onChange={this.handleChange}>
            <NavTab to="home" label="Home" />
            <NavTab to="about" label="About" />
            <NavTab to="features" label="Features" />
            <NavTab to="contact" label="Contact" />
          </Tabs>
        </Toolbar>
      </AppBar>
    );
  }
}

const StyledNavbar = injectSheet(styles)(Navbar);

export default StyledNavbar;
