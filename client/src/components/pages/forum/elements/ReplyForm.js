import React, { Component } from "react";
import injectSheet from "react-jss";

import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough";

import BBParser from "./BBParser";
import insertText from "../../../../utils/insertText";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 820
  },
  appBar: {
    boxShadow: "unset"
  },
  tabs: {
    backgroundColor: theme.palette.secondary["300"]
  },
  controls: {
    backgroundColor: theme.palette.secondary["300"]
  },
  toolbar: {
    minHeight: 56
  },
  grow: {
    flexGrow: 1
  },
  container: {
    padding: [[10, 20]],
    minHeight: 210
  },
  selectRoot: {
    marginLeft: 12
  }
});

class ReplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      input: this.props.editPost ? this.props.value : "",
      vm: null
    };
  }

  handleEditorRef = vm => {
    this.setState({ vm: vm });
    this.props.handleEditorRef(vm);
  };

  handleTabChange = (event, value) => {
    this.setState({ value: value });
  };

  handleTextChange = event => {
    this.setState({ input: event.target.value });
  };

  insert = e => {
    const { vm } = this.state;
    const type = e.currentTarget
      ? e.currentTarget.getAttribute("data-action")
      : e;
    insertText(vm, type);
    this.setState({ input: vm.value });
  };

  render() {
    const { classes } = this.props;
    const { value, input } = this.state;
    return (
      <Paper className={classes.root} elevation={2} square>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleTabChange}
          value={value}
          classes={{
            flexContainer: classes.tabs
          }}
        >
          <Tab label="Write" />
          <Tab label="Preview" />
        </Tabs>
        <div className={classes.container}>
          {value === 0 && (
            <TextField
              label="Enter content here"
              multiline
              margin="normal"
              variant="filled"
              fullWidth
              rows="7"
              value={input}
              onChange={this.handleTextChange}
              onFocus={this.handleTextChange}
              inputRef={this.handleEditorRef}
              name="content"
            />
          )}
          {value === 1 && <BBParser input={input} />}
        </div>
        <Appbar
          position="relative"
          color="secondary"
          classes={{
            root: classes.appBar,
            colorSecondary: classes.controls
          }}
        >
          <Toolbar className={classes.toolbar}>
            <Tooltip title="Bold" placement="top">
              <IconButton onClick={this.insert} data-action="bold">
                <FormatBoldIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Italic" placement="top">
              <IconButton onClick={this.insert} data-action="italic">
                <FormatItalicIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Underline" placement="top">
              <IconButton onClick={this.insert} data-action="underline">
                <FormatUnderlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Strikethrough" placement="top">
              <IconButton onClick={this.insert} data-action="strikethrough">
                <FormatStrikethroughIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <FormControl
              classes={{
                root: classes.selectRoot
              }}
            >
              <Select displayEmpty value="">
                <MenuItem value="" disabled>
                  Text Size
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.grow} />
            {this.props.editPost && (
              <Button
                variant="text"
                color="secondary"
                size="small"
                type="button"
                style={{
                  marginRight: 10
                }}
                onClick={() => {
                  this.props.editMode(false);
                }}
              >
                Cancel
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            >
              Post
            </Button>
          </Toolbar>
        </Appbar>
      </Paper>
    );
  }
}

const StyledReplyForm = injectSheet(styles)(ReplyForm);

export default StyledReplyForm;
