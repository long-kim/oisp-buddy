import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import injectSheet from "react-jss";
import background from "assets/img/buttonblue@2x.png";

const styles = theme => ({
  input: {
    padding: [[10, 5]],
    marginBottom: 5,
    borderRadius: 3,
    fontSize: 12,
    border: "unset",
    outline: "none",
    color: "#999",
    backgroundColor: "#222",
    width: "100%"
  }
});

class ForumInput extends Component {
  render() {
    const { classes } = this.props;
    return (
      <input
        className={classes.input}
        type={this.props.type}
        name={this.props.name}
        placeholder={this.props.placeholder}
        required={this.props.required}
      />
    );
  }
}

ForumInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  style: PropTypes.object,
  placeholder: PropTypes.string
};

const StyledForumInput = injectSheet(styles)(ForumInput);

export default StyledForumInput;
