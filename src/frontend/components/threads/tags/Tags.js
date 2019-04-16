import React from "react";
import { Tag } from "bbcode-to-react";
import Spoiler from "frontend/components/threads/tags/Spoiler";
import Code from "react-code-prettify";
var _react = require("react");
var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

export class LineBreak extends Tag {
  toReact() {
    return <br />;
  }
}

export class SpoilerBox extends Tag {
  toReact() {
    return <Spoiler content={this.getComponents()} />;
  }
}

export class FontSize extends Tag {
  toReact() {
    const size = this.params.size;

    if (isNaN(size)) {
      return this.getComponents();
    }

    return _react2.default.createElement(
      "span",
      { style: { fontSize: size + "%" } },
      this.getComponents()
    );
  }
}

export class CodeBlock extends Tag {
  toReact() {
    return (
      <Code codeString={this.getComponents()} language={this.params.lang} />
    );
  }
}

export class Paragraph extends Tag {
  toReact() {
    return <p>{this.getComponents()}</p>;
  }
}

export class Quote extends Tag {
  toReact() {
    return (
      <blockquote className="quote">
        <div className="quote-header">
          <a
            href={`${process.env.PUBLIC_URL}/user/${this.params.author_id}`}
            className="author"
          >
            {this.params.name}&nbsp;
          </a>
          wrote&nbsp;
          <a
            href={`${process.env.PUBLIC_URL}/forum/thread/${
              this.params.parent_id
            }#${this.params.post_id}`}
            className="post-anchor"
          >
            <i className="fas fa-long-arrow-alt-up" />
          </a>
        </div>
        <div className="quote-content">{this.getComponents()}</div>
      </blockquote>
    );
  }
}
