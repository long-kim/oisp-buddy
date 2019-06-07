import React, { Component } from "react";
import injectSheet from "react-jss";
import { LazyImage } from "react-lazy-images";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import temp from "../../../../assets/images/forum/forum-bg-small.jpg";

const styles = {
  forumHeader: {
    position: "relative",
    height: 200,
    width: 1000,
    overflow: "hidden"
  },
  headerImg: {
    position: "absolute",
    height: 200,
    width: 1000,
    objectFit: "cover",
    objectPosition: [["50%", 0]],
    filter: "brightness(0.6)"
  },
  title: {
    position: "absolute",
    bottom: 15,
    left: 25,
    width: 700,
    color: "#fff",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.36)"
  },
  tooltip: {
    fontSize: 12
  }
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  handleLoad = () => {
    this.setState({ loading: false });
  };

  render() {
    const { classes, cover } = this.props;
    return (
      <Grid item className={classes.forumHeader}>
        <LazyImage
          src={cover}
          className={classes.headerImg}
          alt=""
          placeholder={({ imageProps, ref }) => (
            <img
              className={classes.headerImg}
              ref={ref}
              src={temp}
              alt={imageProps.alt}
            />
          )}
          actual={({ imageProps }) => <img {...imageProps} />}
        />
        {/* <img src={this.props.cover} className={classes.headerImg} /> */}
        {this.props.noTooltip && (
          <Typography component="h1" variant="h3" className={classes.title}>
            {this.props.content}
          </Typography>
        )}
        {!this.props.noTooltip && (
          <Tooltip
            title={this.props.tooltip}
            aria-label={this.props.tooltip}
            placement="bottom-start"
            classes={{
              tooltip: classes.tooltip
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              className={classes.title}
            >
              {this.props.content}
            </Typography>
          </Tooltip>
        )}
      </Grid>
    );
  }
}

const StyledHeader = injectSheet(styles)(Header);

export default StyledHeader;
