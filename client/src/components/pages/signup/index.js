import React, { Component } from "react";
import { Redirect } from "react-router";
import Axios from "axios";
import injectSheet from "react-jss";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { UserContext } from "../../UserContext";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary["300"]
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: 500,
    height: "auto"
  },
  inputRoot: {
    marginTop: theme.spacing.unit
  },
  inputRootName: {
    marginTop: theme.spacing.unit,
    width: "50%"
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordNotMatch: false,
      redirectToReferrer: false
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { authorize } = this.context;
    const form = new FormData(document.getElementById("loginfrm"));
    const login_info = {
      username: form.get("username"),
      password: form.get("password"),
      email: form.get("email")
    };
    const response = await Axios.post("/auth/signup", login_info);
    this.setState({ redirectToReferrer: true });
  };

  validatePassword = e => {
    const repassword = e.target.value;
    const form = new FormData(document.getElementById("loginfrm"));
    if (repassword !== form.get("password")) {
      this.setState({ passwordNotMatch: true });
    } else {
      this.setState({ passwordNotMatch: false });
    }
  };

  render() {
    let { from } = this.props.location.state || {
      from: { pathname: "/" }
    };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    const { classes } = this.props;
    const { passwordNotMatch } = this.state;
    return (
      <div className={classes.root}>
        <form id="loginfrm" method="POST" onSubmit={this.handleSubmit}>
          <Card
            classes={{
              root: classes.card
            }}
          >
            <CardContent className={classes.content}>
              <Typography component="h1" variant="h4">
                Sign Up
              </Typography>
              <Typography component="h2" variant="subtitle2" gutterBottom>
                Enter your information below
              </Typography>
              <TextField
                label="Username"
                name="username"
                type="text"
                fullWidth
                classes={{
                  root: classes.inputRoot
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                classes={{
                  root: classes.inputRoot
                }}
              />
              <TextField
                label="Re-enter password"
                name="password"
                type="password"
                fullWidth
                onBlur={this.validatePassword}
                error={passwordNotMatch}
                helperText={passwordNotMatch ? "Passwords do not match" : ""}
                classes={{
                  root: classes.inputRoot
                }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                classes={{
                  root: classes.inputRoot
                }}
              />
              <Grid container spacing={8}>
                <Grid item className={classes.inputRootName}>
                  <TextField
                    label="First Name"
                    name="first_name"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.inputRootName}>
                  <TextField
                    label="Last Name"
                    name="last_name"
                    type="text"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
              classes={{
                root: classes.action
              }}
            >
              <Button color="primary" variant="text" type="submit" disabled={passwordNotMatch}>
                Signup
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    );
  }
}

const StyledSignup = injectSheet(styles)(Signup);

Signup.contextType = UserContext;

export default StyledSignup;
