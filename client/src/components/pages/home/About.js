import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import injectSheet from "react-jss";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import AuthorCard from "./elements/AuthorCard";

const styles = theme => ({
  section: {
    height: "100vh",
    backgroundColor: theme.palette.secondary["200"],
    paddingTop: 64
  },
  content: {
    color: "#fff",
    textAlign: "center",
    height: "100%",
    [theme.breakpoints.down("lg")]: {
      paddingTop: 0
    }
  },
  heading: {
    color: theme.palette.primary["A700"]
  },
  subtitle: {
    color: theme.palette.secondary.main
  },
  action: {
    marginTop: 10
  },
  button: {
    minWidth: 100
  },
  authors: {
    marginTop: 0,
    width: 960,
    flexWrap: "wrap",
    [theme.breakpoints.down("lg")]: {
      width: "100%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "nowrap",
      overflow: "scroll"
    }
  }
});

class AboutSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: null
    };
  }

  renderActions = classes => {
    if (this.state.loggedIn) {
      return (
        <>
          <Button
            component={Link}
            to="/forum/index"
            variant="contained"
            color="primary"
          >
            Go to Forums
          </Button>
          <span>
            Logged in as <b>{this.state.user.username}</b>
            <span className="sign-out">Sign out</span>
          </span>
        </>
      );
    } else {
      return (
        <>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
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
      <section className={classes.section} id="about">
        <Grid
          className={classes.content}
          container
          justify="space-evenly"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography
              component="h1"
              variant="h2"
              classes={{ h2: classes.heading }}
              gutterBottom
            >
              About Us
            </Typography>
            <Typography
              component="p"
              variant="subtitle1"
              classes={{ subtitle1: classes.subtitle }}
            >
              The team behind OISP Buddy
            </Typography>
          </Grid>
          <Grid
            className={classes.authors}
            container
            justify="space-evenly"
            direction="row"
            alignItems="center"
            spacing={32}
          >
            <AuthorCard
              name="Long Kim"
              title="Co-Founder - Chief Technology Officer"
              avatar="/images/avatars/avatar_long.jpg"
            />
            <AuthorCard
              name="Vo Ngoc Quynh Nhu"
              title="Chief Operating Officer"
              avatar="/images/avatars/avatar_nhu.jpg"
            />
            <AuthorCard
              name="Tran Duc Thinh"
              title="Co-Founder - Chief Executive Officer"
              avatar="/images/avatars/avatar_jim.jpg"
            />
            <AuthorCard
              name="Nguyen Phuc An"
              title="Chief Financial Officer"
              avatar="/images/avatars/avatar_an.jpg"
            />
            <AuthorCard
              name="Ly Hung Duy"
              title="Chief Reputation Officer"
              avatar="/images/avatars/avatar-default.svg"
            />
          </Grid>
        </Grid>
      </section>
    );
  }
}

const StyledSection = injectSheet(styles)(AboutSection);

export default StyledSection;
