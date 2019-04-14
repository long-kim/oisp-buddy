import React, { Component } from "react";
import parser from "bbcode-to-react";
import * as tags from "frontend/components/threads/tags/Tags";

parser.registerTag("br", tags.LineBreak);
parser.registerTag("spoil", tags.SpoilerBox);
parser.registerTag("size", tags.FontSize);
parser.registerTag("code", tags.CodeBlock);
parser.registerTag("p", tags.Paragraph);

class BBParser extends Component {
  render() {
    return <div className="bbparser">{parser.toReact(this.props.input)}</div>;
  }
}

export default BBParser;