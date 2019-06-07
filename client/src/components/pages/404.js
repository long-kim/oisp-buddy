import React, { Component } from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.secondary["300"]
  },
  button: {
    marginTop: 20
  }
});

class Page404 extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Typography component="h1" variant="h1" color="primary">
          404
        </Typography>
        <Typography component="span" variant="h6" color="secondary">
          The page you are trying to access does not exist
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          Go back
        </Button>
      </Grid>
    );
  }
}

const Styled404 = injectSheet(styles)(Page404);

export default Styled404;
