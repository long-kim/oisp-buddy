import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import injectSheet from "react-jss";

import btnBackground from "../../../../assets/ui-elements/button.svg";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  overview: {
    listStyle: "none",
    cursor: "pointer",
    transition: [["all", "0.2s", "ease"]],
    color: "#575757",
    "&:hover": {
      backgroundColor: "#eeeeee",
      transition: [["all", "0.2s", "ease"]]
    }
  },
  inner: {
    width: "100%",
    margin: [[0, 40]],
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: [[1, "solid", "#ccc"]]
  },
  status: {
    textDecoration: "none",
    height: 32,
    width: 32,
    borderRadius: "50%",
    margin: [[12, 0]],
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${btnBackground})`,
    backgroundSize: 50,
    backgroundPosition: "50%",
    color: "#fff",
    "& i": {
      textShadow:
        "0 1px 1px rgba(65, 69, 73, 0.15), 0 1px 3px rgba(65, 69, 73, 0.35)"
    }
  },
  content: {
    flex: 1,
    margin: [[7.5, 5]]
  },
  mainInfo: {
    margin: [[2, 5]],
    "& a": {
      textDecoration: "none"
    }
  },
  title: {
    fontSize: 15,
    color: theme.palette.primary[800],
    lineHeight: "15px"
  },
  author: {
    fontSize: 13,
    lineHeight: "13px"
  },
  userLink: {
    color: "#2299bb"
  },
  middle: {
    width: 70,
    fontSize: 12,
    color: "#575757",
    margin: [[2, 5]],
    "& span": {
      width: 70,
      textAlign: "right"
    }
  },
  lastPost: {
    width: 200,
    textAlign: "right",
    fontSize: 13,
    margin: [[2, 5]],
    color: "#575757",
    "& a": {
      textDecoration: "none",
      color: "#2299bb"
    }
  },
  arrow: {
    display: "flex",
    height: "100%",
    width: 30,
    color: "#575757",
    fontSize: 13
  }
});

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: 0,
      score: this.props.score,
      subscribed: false,
      voted: 0
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        component="li"
        direction="row"
        alignItems="center"
        className={classes.overview}
        id={`thread_id__${this.props.thread_id}`}
      >
        <div className={classes.inner}>
          <Grid
            container
            component={Link}
            className={classes.status}
            justify="center"
            alignItems="center"
            to={{
              pathname: `thread/${this.props.thread_id}`,
              state: { topics: this.props.topics, ...this.state }
            }}
          >
            <i className="fas fa-fw fa-comment" />
          </Grid>
          <Grid container direction="row" className={classes.content}>
            <Grid container direction="column" className={classes.mainInfo}>
              <Grid
                item
                component={Link}
                to={{
                  pathname: `thread/${this.props.thread_id}`,
                  state: { topics: this.props.topics, ...this.state }
                }}
                className={classes.title}
              >
                {this.props.title}
              </Grid>
              <Grid item className={classes.author} component="span">
                by&nbsp;
                <Link
                  to={`/profile/${this.props.author.id}`}
                  className={classes.userLink}
                >
                  <b>{this.props.author.name}</b>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column" className={classes.middle}>
            <Grid item component="span">
              0&nbsp;
              <i className="fas fa-fw fa-eye" />
            </Grid>
            <Grid item component="span">
              {this.props.posts_count}&nbsp;
              <i className="far fa-fw fa-comment" />
            </Grid>
          </Grid>
          <Grid container direction="column" className={classes.lastPost}>
            <Grid item component="span">
              last reply by&nbsp;
              <Link to={`/profile/${this.props.last_reply.posted_by}`}>
                <b>{this.props.last_reply.name}</b>
              </Link>
            </Grid>
            <Grid item component="span">
              <Moment fromNow>{this.props.last_reply.at}</Moment>
            </Grid>
          </Grid>
          <Grid container justify="center" className={classes.arrow}>
            <i className="fas fa-chevron-right" />
          </Grid>
        </div>
      </Grid>
    );
  }
}

const StyledOverview = injectSheet(styles)(Overview);

export default StyledOverview;
