import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Spoiler extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };
  }

  render() {
    const { open } = this.state;
    return (
      <div className="spoiler-wrapper">
        <Button
          onClick={() => this.setState({ open: !open })}
          aria-expanded={open}
          size="sm"
        >
          Spoiler - Click to see
        </Button>
        {open && (
          <div className={"content-wrapper"}>{this.props.content[0]}</div>
        )}
      </div>
    );
  }
}

export default Spoiler;
