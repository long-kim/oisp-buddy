import React, { Component } from "react";
import Routes from "frontend/Routes";
import "assets/styles/scss/main.scss";
import "assets/fonts/Lato/latofonts.css";
import { brown, grey } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: brown
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    );
  }
}

export default App;
