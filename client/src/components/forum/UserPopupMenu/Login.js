import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import PopupMenu from "./";
import ForumInput from "../Input/ForumInput";
import ForumButton from "../Button";

const styles = theme => ({
  section: {
    padding: [[20, 20, 0]],
    display: "flex",
    flexDirection: "column"
  },
  registerUser: {
    backgroundColor: "#444",
    borderRadius: [[0, 0, 5, 5]],
    borderBottom: 5
  },
  title: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 10
  },
  forumButton: {
    width: 100,
    fontSize: 13,
    marginTop: 5,
    textAlign: "left"
  },
  resetPassword: {
    textDecoration: "none",
    color: theme.palette.primary["A700"],
    fontSize: 14,
    transition: "all 0.12s",
    "&:hover": {
      color: theme.palette.primary["A100"],
      transition: "all 0.12s"
    }
  },
  content: {
    fontSize: 13,
    color: "#aeaeae",
    marginBottom: 5
  }
});

class LoginPopupMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { classes } = this.props;
    const btnStyles = {
      fontSize: "13px",
      color: "#fff"
    };
    return (
      <PopupMenu avatar={this.props.avatar} style={{ width: 270 }}>
        <form
          className={classes.section}
          id="signin-form"
          method="POST"
          onSubmit={this.props.onSubmit}
        >
          <h4 className={classes.title}>Sign in to proceed</h4>
          <ForumInput
            type="text"
            placeholder="username"
            name="username"
            required
          />
          <ForumInput
            type="password"
            placeholder="password"
            name="password"
            required
          />
          <Link className={classes.resetPassword} to="/password/reset">
            Forgot Password?
          </Link>
          <ForumButton type="submit" icon="fa-sign-in-alt" style={btnStyles}>
            Sign in
          </ForumButton>
        </form>
        <div className={classNames(classes.section, classes.registerUser)}>
          <h4 className={classes.title}>Don't have an account?</h4>
          <p className={classes.content}>
            You need an account to use our site. Why don't you create one?
          </p>
          <ForumButton type="button" icon="fa-user-plus" style={btnStyles}>
            Register
          </ForumButton>
        </div>
      </PopupMenu>
    );
  }
}

LoginPopupMenu.propTypes = {
  avatar: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const StyledPopupMenu = injectSheet(styles)(LoginPopupMenu);

export default StyledPopupMenu;
