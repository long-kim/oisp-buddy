import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import insertText from "frontend/helpers/insertText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BBParser from "./BBParser";
class ReplyForm extends Component {
  constructor(props) {
    super(props);

    this.vm = null;
    this.handleEditorRef = vm => {
      this.vm = vm;
    };

    this.state = {
      active: "edit",
      input: ""
    };
  }

  insert = e => {
    const { vm } = this;
    const type = e.currentTarget
      ? e.currentTarget.getAttribute("data-type")
      : e;
    console.log(type);
    insertText(vm, type);
    this.setState({ input: vm.value });
  };

  setfsize = e => {
    const { vm } = this;
    const size = e.currentTarget.value;
    let type = "fsize";
    switch (size) {
      case "50":
        type = "fsize50";
        console.log(type);
        break;
      case "85":
        type = "fsize85";
        break;
      case "100":
        type = "fsize100";
        break;
      case "150":
        type = "fsize150";
        break;
      default:
        console.error("Invalid size");
    }
    insertText(vm, type);
    e.currentTarget.selectedIndex = 0;
    this.setState({ input: vm.value });
  };

  render() {
    return (
      <div className="ReplyForm" id="reply_form">
        <Tabs
          id="reply"
          activeKey={this.state.active}
          onSelect={key => this.setState({ active: key })}
          transition={false}
        >
          <Tab eventKey="edit" title="Write">
            <Form.Group>
              <div className="mdedit-wrapper">
                <Form.Control
                  as="textarea"
                  rows="15"
                  placeholder="Type post content here"
                  name="content"
                  onChange={e => {
                    this.setState({
                      input: e.target.value
                    });
                  }}
                  onFocus={e => {
                    this.setState({
                      input: e.target.value
                    });
                  }}
                  ref={this.handleEditorRef}
                />
              </div>
            </Form.Group>
          </Tab>
          <Tab eventKey="preview" title="Preview">
            <div className="md-preview-wrapper">
              <BBParser input={this.state.input} />
            </div>
          </Tab>
        </Tabs>
        <div className="reply-controls">
          <ul className="mr-auto">
            <li data-type="bold" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Bold
                  </div>
                )}
              >
                <FontAwesomeIcon icon="bold" />
              </OverlayTrigger>
            </li>
            <li data-type="italic" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Italic
                  </div>
                )}
              >
                <i className="fa fa-italic" />
              </OverlayTrigger>
            </li>
            <li data-type="strikethrough" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Strikethrough
                  </div>
                )}
              >
                <i className="fa fa-strikethrough" />
              </OverlayTrigger>
            </li>
            <li data-type="url" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Link
                  </div>
                )}
              >
                <i className="fa fa-link" />
              </OverlayTrigger>
            </li>
            <li data-type="ol" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Ordered List
                  </div>
                )}
              >
                <i className="fa fa-list-ol" />
              </OverlayTrigger>
            </li>
            <li data-type="ul" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Unordered List
                  </div>
                )}
              >
                <i className="fa fa-list-ul" />
              </OverlayTrigger>
            </li>
            <li data-type="image" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Image
                  </div>
                )}
              >
                <FontAwesomeIcon icon="image" />
              </OverlayTrigger>
            </li>
            <li data-type="code" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Code
                  </div>
                )}
              >
                <i className="fa fa-code" />
              </OverlayTrigger>
            </li>
            <li data-type="paragraph" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Paragraph
                  </div>
                )}
              >
                <i className="fa fa-paragraph" />
              </OverlayTrigger>
            </li>
            <li data-type="break" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Line Break
                  </div>
                )}
              >
                <span>br</span>
              </OverlayTrigger>
            </li>
            <li data-type="spoiler" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Spoiler Box
                  </div>
                )}
              >
                <i className="fa fa-barcode" />
              </OverlayTrigger>
            </li>
            <li data-type="quote" onClick={this.insert}>
              <OverlayTrigger
                placement="top"
                overlay={({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  ...props
                }) => (
                  <div className="mdedit-tooltip" {...props}>
                    Quote
                  </div>
                )}
              >
                <i className="fa fa-quote-right" />
              </OverlayTrigger>
            </li>
            <label className="fsize-select select-wrapper">
              <span className="select-label">Font Size</span>
              <i className="fa fa-chevron-down" />
              <select
                className="fsize select-menu"
                data-type="fsize"
                onChange={this.setfsize}
              >
                <option value="" disabled hidden defaultValue />
                <option value="50">Tiny</option>
                <option value="85">Small</option>
                <option value="100">Normal</option>
                <option value="150">Large</option>
              </select>
            </label>
          </ul>

          {this.props.edit && (
            <div
              className="control cancel-edit"
              onClick={this.props.cancel}
            >
              Cancel
            </div>
          )}
          {!this.props.createThread && (
            <Button
              variant="primary"
              size="sm"
              className="post-btn"
              type="submit"
            >
              Post
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default ReplyForm;
