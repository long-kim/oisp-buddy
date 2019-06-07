import React, { Component } from "react";
import parser from "bbcode-to-react";
import * as tags from "./tags/Tags";

import Typography from "@material-ui/core/Typography";

parser.registerTag("br", tags.LineBreak);
parser.registerTag("spoil", tags.SpoilerBox);
parser.registerTag("size", tags.FontSize);
parser.registerTag("code", tags.CodeBlock);
parser.registerTag("p", tags.Paragraph);
parser.registerTag("quote", tags.Quote);

class BBParser extends Component {
  render() {
    return (
      <div className="bbparser">
        <Typography component="div" variant="body1">
          {parser.toReact(this.props.input)}
        </Typography>
      </div>
    );
  }
}

export default BBParser;
