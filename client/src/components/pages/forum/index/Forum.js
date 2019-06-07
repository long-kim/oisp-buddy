import React, { Component } from "react";
import injectSheet from "react-jss";

import Grid from "@material-ui/core/Grid";

import Header from "../elements/Header";
import ThreadList from "./ThreadList";

import background from "../../../../assets/images/forum/background.png";
import cover from "../../../../assets/images/forum/forum-bg.jpg";

const styles = theme => ({
  wrapper: {
    backgroundImage: `url(${background})`,
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    height: "fit-content"
  },
  root: {
    maxWidth: "100%"
  },
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
  }
});

class Index extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.root}
        >
          <Header cover={cover} content="Forum" noTooltip />
          <ThreadList search={this.props.location.search} />
        </Grid>
      </div>
    );
  }
}

const StyledIndex = injectSheet(styles)(Index);

export default StyledIndex;
