import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import injectSheet from "react-jss";

import Navbar from "../../Navbar";
import Index from "./index/Forum";
import Thread from "./thread/Thread";
import Create from "./create/Create";
import Page404 from "../404";

import Grid from "@material-ui/core/Grid";

import background from "../../../assets/images/forum/background.png";
import UserContext from "../../UserContext";

const styles = theme => ({
  wrapper: {
    backgroundColor: "#222",
    backgroundImage: `url(${background})`,
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    height: "fit-content"
  }
});

class Forum extends Component {
  render() {
    const { classes, match } = this.props;
    return (
      <UserContext.Consumer>
        {({ redirect }) => (
          <>
            <Navbar />
            <Grid container justify="center" className={classes.wrapper}>
              <Switch>
                {redirect && <Redirect to="/" />}
                <Route exact path={`${match.path}/index`} component={Index} />
                <Route
                  exact
                  path={`${match.path}/thread/:threadId`}
                  component={Thread}
                />
                <Route exact path={`${match.path}/create`} component={Create} />
                <Route component={Page404} />
              </Switch>
            </Grid>
          </>
        )}
      </UserContext.Consumer>
    );
  }
}

const StyledForum = injectSheet(styles)(Forum);

export default StyledForum;
