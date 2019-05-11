import React, { Component } from "react";
import Popup from "reactjs-popup";
import classNames from "classnames";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import UserMenu from "./UserMenu";

const styles = theme => ({
  root: {
    borderRadius: 5,
    backgroundColor: ["#333", "!important"]
  },
  overlay: {
    position: "relative",
    cursor: "pointer",
    borderRadius: "50%",
    boxShadow: theme.shadows[2],
    "&:after": {
      content: '" "',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      opacity: 0,
      backgroundColor: "#fff",
      transition: "all 0.3s"
    },
    "&:hover": {
      "&:after": {
        opacity: 0.1,
        transition: "all 0.3s"
      }
    }
  },
  avatar: {
    maxWidth: 40,
    objectFit: "cover",
    borderRadius: "50%",
    transition: "all 0.12s",
    "&.open": {
      filter: "brightness(0.9)",
      transition: "all 0.12s"
    }
  },
  userDashboard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 100
  },
  coverImage: {
    position: "absolute",
    height: "100px",
    width: "100%",
    objectFit: "cover",
    objectPosition: "50% 50%",
    filter: "brightness(0.5) blur(1px)",
    borderRadius: [[5, 5, 0, 0]]
  },
  avatarInner: {
    marginTop: 10,
    width: 50,
    height: 50,
    borderRadius: "50%",
    border: [2, "solid", "#ddd"],
    boxShadow: theme.shadows[2],
    zIndex: 1
  },
  username: {
    zIndex: 1,
    marginTop: 8,
    color: "#ddd",
    fontSize: 16
  }
});

class PopupMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="user-info logged-in">
        <Popup
          className={classes.root}
          trigger={
            <div className={classes.overlay}>
              <img
                className={classNames(classes.avatar, {
                  open: this.state.open
                })}
                src={this.props.avatar}
                alt="avatar"
                onMouseEnter={() => {
                  this.setState({ show: true });
                }}
              />
            </div>
          }
          arrow={false}
          position="bottom right"
          offsetY={15}
          open={this.state.open}
          onOpen={() => this.setState({ open: true })}
          onClose={() => this.setState({ open: false })}
          contentStyle={{
            ...this.props.style,
            border: "unset",
            padding: 0,
            boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2),
                    0px 4px 5px 0px rgba(0,0,0,0.14),
                    0px 1px 10px 0px rgba(0,0,0,0.12)`
          }}
        >
          {this.props.children}
        </Popup>
      </div>
    );
  }
}

PopupMenu.propTypes = {
  avatar: PropTypes.string.isRequired,
  style: PropTypes.object
}

const StyledPopupMenu = injectSheet(styles)(PopupMenu);

export default StyledPopupMenu;
