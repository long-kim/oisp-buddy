import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import classNames from "classnames";
import injectSheet from "react-jss";
import Axios from "axios";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";

import homeBackground from "../../../assets/images/homepage/home.png";

import { UserContext } from "../../UserContext";

const styles = theme => ({
  section: {
    marginTop: -64,
    height: "100vh",
    backgroundImage: `url(${homeBackground})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  intro: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    background: "rgba(0, 0, 0, 0.55)"
  },
  content: {
    color: "#fff",
    textAlign: "center",
    [theme.breakpoints.up("lg")]: {
      width: "50%"
    }
  },
  heading: {
    color: "#fff",
    marginBottom: 15
  },
  subtitle: {
    color: "#fff"
  },
  action: {
    marginTop: 10,
    width: "100%"
  },
  button: {
    minWidth: 100
  },
  loggedIn: {
    color: "#fff"
  },
  signOut: {
    textAlign: "center",
    color: theme.palette.primary.main,
    cursor: "pointer",
    transition: "all 0.12s",
    "&:hover": {
      color: theme.palette.primary.light,
      transition: "all 0.12s"
    }
  }
});

class HomeSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {
        firstName: "",
        user_id: 0,
        username: "",
        avatar: ""
      }
    };
  }

  componentDidUpdate() {
    const { currentUser, authorize } = this.context;
    if (!_.isNull(currentUser) && !this.state.loggedIn) {
      this.setState({
        user: currentUser,
        loggedIn: true
      });
    }
  }

  handleLogout = async handler => {
    await handler();
    this.setState({ loggedIn: false });
  };

  renderActions = (classes, currentUser, logOut) => {
    if (currentUser.user_id !== 0) {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={8}
        >
          <Grid item>
            <Button
              component={Link}
              to="/forum/index"
              variant="contained"
              color="primary"
            >
              Go to Forums
            </Button>
          </Grid>
          <Grid item>
            <Typography
              component="span"
              variant="subtitle2"
              className={classes.loggedIn}
            >
              Logged in as <b>{currentUser.username}</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              component="span"
              variant="button"
              className={classes.signOut}
              onClick={() => {
                this.handleLogout(logOut);
              }}
            >
              Sign out
            </Typography>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component={Link}
              to="/signup"
            >
              Sign up
            </Button>
          </Grid>
        </>
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <UserContext.Consumer>
        {({ currentUser, logOut, loading }) => (
          <section className={classes.section} id="home">
            <div className={classes.intro}>
              <Grid
                container
                className={classes.content}
                direction="column"
                alignItems="center"
              >
                <Typography
                  component="h1"
                  variant="h1"
                  classes={{ h1: classes.heading }}
                >
                  OISP Buddy
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle1"
                  classes={{ subtitle1: classes.subtitle }}
                  gutterBottom
                >
                  Modern social platform for OISP students.
                </Typography>
              </Grid>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                {loading && <CircularProgress color="primary" />}
                <Grid
                  className={classNames(classes.action, {
                    "logged-in": this.state.loggedIn
                  })}
                  container
                  justify="center"
                  direction="row"
                  alignItems="center"
                  spacing={16}
                >
                  {!loading && this.renderActions(classes, currentUser, logOut)}
                </Grid>
              </Grid>
            </div>
          </section>
        )}
      </UserContext.Consumer>
    );
  }
}

const StyledSection = injectSheet(styles)(HomeSection);

HomeSection.contextType = UserContext;

export default StyledSection;
