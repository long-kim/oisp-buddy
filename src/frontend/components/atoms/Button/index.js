import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import injectSheet from "react-jss";
import background from "assets/img/buttonblue@2x.png";

const styles = theme => ({
  actionBox: {
    margin: [[0, 0, 10]],
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  forumButton: {
    width: 120,
    height: 35,
    border: "unset",
    padding: [[7, 10]],
    marginTop: 5,
    textAlign: "left",
    outline: "none",
    borderRadius: theme.shape.borderRadius,
    display: "inline-block",
    background: "none",
    backgroundColor: theme.palette.primary['A700'],
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: [["50%", "50%"]],
    overflow: "hidden",
    cursor: "pointer",
    textTransform: "none",
    whiteSpace: "nowrap",
    transition: [["background-position", ".12s"]],
    "&:hover": {
      backgroundPosition: "calc(50% - 20px) 50%"
    }
  },
  btnContent: {
    height: "100%",
    width: "auto",
    margin: [[0, -5]],
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  left: {
    margin: [[0, 5]],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left"
  }
});

class ForumButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.actionBox}>
        <button
          className={classes.forumButton}
          type={this.props.type}
          style={this.props.style}
        >
          <div className={classes.btnContent}>
            <span className={classes.left}>{this.props.children}</span>
            <span className={classNames("fas fa-fw", this.props.icon)} />
          </div>
        </button>
      </div>
    );
  }
}

ForumButton.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]).isRequired,
  style: PropTypes.object,
  icon: PropTypes.string.isRequired,
  required: PropTypes.bool
};

const StyledButton = injectSheet(styles)(ForumButton);

export default StyledButton;
