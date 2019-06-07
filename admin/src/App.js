import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Admin from "./Admin";
import "assets/css/material-dashboard-react.css";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/login";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { grey, cyan, red, blue, teal } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: grey,
    danger: red
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/" component={Admin} />
            </Switch>
          </BrowserRouter>
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}

export default App;
