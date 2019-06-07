import React, { Component } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { grey, cyan, red, blue, teal } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import UserContext from "../UserContext";
import Routes from "../Routes";
import Axios from "axios";
import _ from "lodash";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: grey,
    danger: red
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        user_id: 0,
        username: "",
        avatar: "",
        cover: "",
        pending: []
      },
      logOut: false,
      loading: true
    };
  }

  authorize = async ({ username, password }) => {
    const response = await Axios.post("/auth/login", {
      username: username,
      password: password
    });
    const user_obj = response.data.user_obj;
    const user = {
      firstName: user_obj.first_name,
      user_id: user_obj.user_id,
      username: user_obj.username,
      avatar: user_obj.avatar,
      cover: user_obj.cover
    };
    this.setState({ user: user });
  };

  logOut = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      await Axios.get("/auth/logout");
      this.setState({
        user: {
          firstName: "",
          user_id: 0,
          username: "",
          avatar: "",
          cover: ""
        }
      });
      this.setState({ logOut: true, loading: true });
    }
  };

  async componentDidMount() {
    const response = await Axios.get("/auth");
    this.setState({ loading: false });
    if (!_.isEmpty(response.data)) {
      this.setState({ user: response.data });
    }
    const friendRequests = await Axios.get(`/api/users/requests`);
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        pending: friendRequests.data
      }
    }));
  }

  async componentDidUpdate(_prevProps, prevState) {
    if (prevState.logOut === true) {
      this.setState({ logOut: false });
    }
    if (prevState.loading !== this.state.loading) {
      const response = await Axios.get("/auth");
      this.setState({ loading: false });
      if (!_.isEmpty(response.data)) {
        this.setState({ user: response.data });
      }
    }
  }

  render() {
    const { logOut, loading } = this.state;
    return (
      <React.Fragment>
        <CssBaseline>
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
              <UserContext.Provider
                value={{
                  currentUser: this.state.user,
                  authorize: this.authorize,
                  logOut: this.logOut,
                  redirect: logOut,
                  loading: loading
                }}
              >
                <div className="oisp-buddy">
                  <Routes />
                </div>
                <div id="chatbox-area" />
              </UserContext.Provider>
            </MuiThemeProvider>
          </BrowserRouter>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default App;
