import React, { Component } from "react";
import injectSheet from "react-jss";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import Axios from "axios";

const styles = theme => ({
  root: {
    width: 600,
    minHeight: 300,
    marginLeft: 40
  },
  buttonRoot: {
    width: 64
  }
});

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.user,
      firstName: "",
      lastName: "",
      passwordNotMatch: false,
      loading: false
    };
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    const [firstName, lastName] = user.name.split(" ");
    if (user !== prevProps.user) {
      this.setState({ ...user, firstName, lastName });
    }
  }

  handleUpdateInfo = async e => {
    e.preventDefault();
    const { user_id, loading } = this.state;
    const { edit } = this.props;
    const data = {};
    const formData = new FormData(e.target);
    formData.forEach((value, key) => {
      data[key] = value;
    });
    this.setState({ loading: true });
    await Axios.patch(`/api/users/edit/${user_id}`, data);
    edit();
    this.setState({ loading: false });
  };

  validatePassword = e => {
    const form = new FormData(document.querySelector("#user-info"));
    const password = form.get("password");
    console.log(e.target.value === password);
    this.setState({ passwordNotMatch: e.target.value !== password });
  };

  render() {
    const { classes } = this.props;
    const {
      firstName,
      lastName,
      year,
      about,
      passwordNotMatch,
      loading
    } = this.state;
    return (
      <Grid
        container
        component="form"
        id="user-info"
        onSubmit={this.handleUpdateInfo}
        direction="column"
        className={classes.root}
      >
        <Grid container direction="row" spacing={8}>
          <Grid
            item
            style={{
              width: "50%"
            }}
          >
            <TextField
              label="First name"
              name="first_name"
              type="text"
              color="primary"
              fullWidth
              value={firstName}
              onChange={e => {
                this.setState({ firstName: e.target.value });
              }}
            />
          </Grid>
          <Grid
            item
            style={{
              width: "50%"
            }}
          >
            <TextField
              label="Last name"
              name="last_name"
              type="text"
              color="primary"
              fullWidth
              value={lastName}
              onChange={e => {
                this.setState({ lastName: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={8}>
          <Grid
            item
            style={{
              width: "50%"
            }}
          >
            <TextField
              label="Password"
              name="password"
              type="password"
              color="primary"
              fullWidth
            />
          </Grid>
          <Grid
            item
            style={{
              width: "50%"
            }}
          >
            <TextField
              label="Re-enter Password"
              name="repassword"
              type="password"
              color="primary"
              helperText={
                this.state.passwordNotMatch ? "Passwords do not match" : ""
              }
              error={this.state.passwordNotMatch}
              onBlur={this.validatePassword}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          item
          component={TextField}
          label="Entrance year"
          name="year"
          type="number"
          color="primary"
          value={year}
          onChange={e => {
            this.setState({ year: e.target.value });
          }}
          style={{ marginTop: 10 }}
        />
        <Grid
          item
          component={TextField}
          label="About"
          name="about"
          helperText="No more than 120 characters"
          type="text"
          multiline
          rows={5}
          color="primary"
          value={about}
          onChange={e => {
            this.setState({ about: e.target.value });
          }}
          style={{ marginTop: 10 }}
        />
        <Grid container justify="flex-end">
          <Button
            variant="text"
            color="primary"
            className={classes.buttonRoot}
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving" : "Save"}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const StyledUserInfo = injectSheet(styles)(UserInfo);

export default StyledUserInfo;
