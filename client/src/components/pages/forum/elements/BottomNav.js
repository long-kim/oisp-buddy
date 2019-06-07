import React, { Component } from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ReplyIcon from "@material-ui/icons/Reply";
import Tooltip from "@material-ui/core/Tooltip";
import Pagination from "material-ui-flat-pagination";

const styles = theme => ({
  bottomBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    justifyContent: "space-between"
  },
  textSecondary: {
    color: theme.palette.secondary["400"]
  },
  disabled: {
    color: [[theme.palette.secondary["600"]], "!important"]
  }
});

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      currentPage: 1,
      bookmark: false,
      reply: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.sub !== prevProps.sub) {
      this.setState({ bookmark: this.props.sub });
    }
  }

  handleClick = (event, offset, number) => {
    this.setState({
      offset: offset,
      currentPage: number
    });
    this.props.change(number);
  };

  handleReply = () => {
    this.props.sticky(!this.state.reply);
    this.setState({ reply: !this.state.reply });
  };

  handleSubscribe = () => {
    this.props.subscribe();
    this.setState({ bookmark: !this.state.bookmark });
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="sticky" color="secondary" className={classes.bottomBar}>
        <Toolbar className={classes.toolbar}>
          <Tooltip
            title={
              !this.state.bookmark ? "Bookmark this thread" : "Remove bookmark"
            }
            placement="top-start"
          >
            <IconButton
              color={this.state.bookmark ? "primary" : "inherit"}
              onClick={this.handleSubscribe}
            >
              <BookmarkIcon />
            </IconButton>
          </Tooltip>

          <Pagination
            limit={10}
            offset={this.state.offset}
            total={this.props.totalPosts}
            currentPageColor="primary"
            otherPageColor="secondary"
            onClick={this.handleClick}
            size="large"
            classes={{
              textSecondary: classes.textSecondary,
              disabled: classes.disabled
            }}
          />
          <Tooltip title="Reply to this thread" placement="top-end">
            <IconButton
              color={this.state.reply ? "primary" : "inherit"}
              onClick={this.handleReply}
            >
              <ReplyIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    );
  }
}

const StyledBottmNav = injectSheet(styles)(BottomNav);

export default StyledBottmNav;
