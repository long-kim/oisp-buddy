import React, { Component } from "react";
import injectSheet from "react-jss";
import PopupMenu from "./";
import UserMenu from "./UserMenu";

const styles = theme => ({
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

class UserPopupMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <PopupMenu avatar={this.props.avatar} style={{ width: 170 }}>
        <div className={classes.userDashboard}>
          <img className={classes.coverImage} src={this.props.cover} />
          <img className={classes.avatarInner} src={this.props.avatar} />
          <h5 className={classes.username}>{this.props.name}</h5>
        </div>
        <UserMenu>{this.props.children}</UserMenu>
      </PopupMenu>
    );
  }
}

const StyledPopupMenu = injectSheet(styles)(UserPopupMenu);

export default StyledPopupMenu;
