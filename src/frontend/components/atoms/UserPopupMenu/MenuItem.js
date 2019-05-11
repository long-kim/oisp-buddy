import React, { Component } from "react";
import classNames from "classnames";
import injectSheet from "react-jss";

const styles = theme => ({
  control: {
    fontSize: 14,
    color: "#ddd",
    display: "flex",
    alignItems: "center",
    margin: "0 7px",
    borderRadius: "4px",
    height: 34,
    paddingLeft: 7,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#222",
      color: "#fff",
    }
  },
  inner: {
    height: "calc(100% - 18px)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingLeft: 15,
    "&.hover": {
      boxShadow: "inset 3px 0 #a56a4b"
    }
  }
});

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <li
        className={classes.control}
        onClick={this.props.onClick}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div className={classNames(classes.inner, { hover: this.state.hover })}>
          {this.props.children}
        </div>
      </li>
    );
  }
}

const StyledMenuItem = injectSheet(styles)(MenuItem);

export default StyledMenuItem;
