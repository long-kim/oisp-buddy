import React, { Component } from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import Axios from "axios";

import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";

import Overview from "../elements/Overview";

const styles = theme => ({
  threadWrapper: {
    width: 1000,
    marginTop: 30,
    padding: [[20, 25]],
    backgroundColor: "#fff",
    minHeight: "calc(100vh - 294px)"
  },
  title: {
    marginBottom: theme.spacing.unit * 3
  },
  fab: {
    width: 150,
    padding: [[0, 20]],
    "& span": {
      display: "flex",
      justifyContent: "space-between"
    }
  },
  fabLabel: {
    color: theme.palette.primary.contrastText
  },
  ThreadList: {
    position: "relative",
    minHeight: "calc(100vh - 294px - 30px - 48px)"
  },
  loading: {
    position: "absolute",
    display: "flex",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& h5": {
      marginTop: theme.spacing.unit
    }
  }
});

class ThreadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      threads: []
    };
  }

  async componentDidMount() {
    const response = await Axios.get(`/api/threads/index${this.props.search}`);
    const data = response.data;
    this.setState({
      threads: data,
      loading: false
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="column" className={classes.threadWrapper}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.title}
        >
          <Typography component="h2" variant="h5">
            Threads
          </Typography>
          <Fab
            variant="extended"
            color="primary"
            aria-label="Create"
            className={classes.fab}
            component={Link}
            to="/forum/create"
            classes={{
              label: classes.fabLabel
            }}
          >
            Create
            <AddIcon />
          </Fab>
        </Grid>
        <Grid
          container
          direction="column"
          justify="flex-start"
          className={classes.ThreadList}
        >
          {this.state.loading && (
            <div className={classes.loading}>
              <CircularProgress color="primary" />
              <Typography component="h5" variant="subtitle2">
                Hang in there
              </Typography>
            </div>
          )}
          {!this.state.loading &&
            this.state.threads.map(thread => {
              return (
                <Overview
                  thread_id={thread.thread_id}
                  author={thread.author}
                  last_reply={thread.last_reply}
                  posts_count={thread.posts_count}
                  score={thread.score}
                  title={thread.title}
                  key={thread.thread_id}
                  topics={thread.Topics}
                  sub={thread.sub}
                  // voted={this.getVote(thread.thread_id)}
                />
              );
            })}
        </Grid>
      </Grid>
    );
  }
}

const StyledThreadList = injectSheet(styles)(ThreadList);

export default StyledThreadList;
