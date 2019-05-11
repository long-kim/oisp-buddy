import React, { Component } from "react";
import Popup from "reactjs-popup";
import classNames from "classnames";
import injectSheet from "react-jss";

const styles = theme => ({
  userMenu: {
      padding: [10, 0],
      marginBottom: 0
  }
});

class UserMenu extends Component {
  render() {
    const { classes } = this.props;
    return (
      <ul className={classes.userMenu}>
        {this.props.children}
      </ul>
    );
  }
}

const StyledUserMenu = injectSheet(styles)(UserMenu);

export default StyledUserMenu;
