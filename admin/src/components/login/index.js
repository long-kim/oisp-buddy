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
  action: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirectToReferrer: false
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData(document.getElementById("loginfrm"));
    const login_info = {
      username: form.get("username"),
      password: form.get("password")
    };
    const response = await Axios.post("/auth/admin", login_info);
    console.log(response);
    sessionStorage.setItem("oisp-token", response.data.token);
    this.setState({ redirectToReferrer: true });
  };

  render() {
    let { from } = this.props.location.state || {
      from: { pathname: "/" }
    };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <form id="loginfrm" method="POST" onSubmit={this.handleSubmit}>
            <Card
              classes={{
                root: classes.card
              }}
            >
              <CardContent className={classes.content}>
                <Typography component="h1" variant="h4">
                  Log In
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
              </CardContent>
              <CardActions
                classes={{
                  root: classes.action
                }}
              >
                <Button color="primary" variant="text" type="submit">
                  Log In
                </Button>
              </CardActions>
            </Card>
          </form>
        </div>
      </>
    );
  }
}

const StyledLogin = injectSheet(styles)(Login);

export default StyledLogin;