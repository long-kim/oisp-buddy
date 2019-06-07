import React, { Component } from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import Axios from "axios";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ReplyForm from "../elements/ReplyForm";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import CircularProgress from "@material-ui/core/CircularProgress";

import Overview from "../elements/Overview";

const styles = theme => ({
  threadWrapper: {
    width: 1000,
    marginTop: 30,
    padding: [[40, 25, 20]],
    backgroundColor: "#fff",
    minHeight: "calc(100vh - 294px)"
  },
  createTitle: {
    maxWidth: 820
  },
  title: {
    marginBottom: theme.spacing.unit * 3
  },
  item: {
    width: "100%",
    maxWidth: 820
  },
  replyForm: {
    marginTop: 50
  },
  fab: {
    width: 150,
    padding: [[0, 20]],
    "& span": {
      display: "flex",
      justifyContent: "space-between"
    }
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
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3
    }
  }
});

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      done: false,
      threads: [],
      vm: null
    };
  }

  handleEditorRef = vm => {
    this.setState({ vm: vm });
  };

  async componentDidMount() {
    // const response = await Axios.get(`/api/threads/index${this.props.search}`);
    // const data = response.data;
    // this.setState({
    //   threads: data,
    //   loading: false
    // });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(document.getElementById("form"));
    console.log(data.get("content"));
    let content = {};
    data.forEach((value, key) => {
      content[key] = value;
    });
    console.log(content);
    this.setState({ loading: true });
    await Axios.post("/api/threads/create", content);
    this.setState({ done: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        component="form"
        id="form"
        onSubmit={this.handleSubmit}
        alignItems="center"
        direction="column"
        className={classes.threadWrapper}
      >
        {this.state.loading && (
          <div className={classes.loading}>
            {!this.state.done ? (
              <CircularProgress color="primary" />
            ) : (
              <DoneRoundedIcon color="primary" />
            )}
            <Typography component="h5" variant="subtitle2">
              {!this.state.done ? "Hang in there" : "Done!"}
            </Typography>
            {this.state.done && (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/forum/index"
              >
                Back to Index
              </Button>
            )}
          </div>
        )}
        {!this.state.loading && (
          <>
            <Grid item className={classes.item}>
              <TextField
                label="Title"
                name="title"
                type="text"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                classes={{ fullWidth: classes.createTitle }}
              />
            </Grid>
            <Grid item className={classNames(classes.item, classes.replyForm)}>
              <ReplyForm handleEditorRef={this.handleEditorRef} />
            </Grid>
          </>
        )}
      </Grid>
    );
  }
}

const StyledCreateForm = injectSheet(styles)(CreateForm);

export default StyledCreateForm;
