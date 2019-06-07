import React, { Component } from "react";
import injectSheet from "react-jss";
import Axios from "axios";
import SwipeableViews from "react-swipeable-views";

import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Fab from "@material-ui/core/Fab";
import LinearProgress from "@material-ui/core/LinearProgress";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import HowToRegIcon from "@material-ui/icons/HowToReg";

import Navbar from "../../Navbar";
import Cover from "./Cover";
import Polaroid from "./Polaroid";
import ThreadList from "./ThreadList";
import FriendList from "./FriendList";
import UserInfo from "./UserInfo";

import UserContext from "../../UserContext";

const styles = theme => ({
  main: {
    marginLeft: 500,
    marginTop: 5,
    width: 1100
  },
  add: {
    position: "fixed",
    bottom: 30,
    right: 30
  },
  loading: {
    position: "fixed",
    top: 64,
    left: 0,
    width: "100%",
    zIndex: 1
  }
});

class Profile extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      user: {
        user_id: 0,
        name: "",
        avatar: "",
        cover: "",
        dept: "",
        year: 0,
        about: "",
        joined: new Date(),
        friends: [],
        threads: [],
        status: 0,
        action_id: 0
      },
      edit: false,
      page: 0,
      loading: true,
      disabled: false
    };
  }

  async componentDidMount() {
    const { userId } = this.props.match.params;
    await this.getUser(userId);
  }

  async componentDidUpdate(prevProps) {
    const { userId } = this.props.match.params;
    if (userId !== prevProps.match.params.userId) {
      this.setState({ loading: true });
      await this.getUser(userId);
    }
    if (this.props.user !== prevProps.user) {
      this.setState({ user: this.props.user });
    }
    if (this.state.edit === true) {
      await this.getUser(userId);
      this.setState({ edit: false, disabled: false });
    }
  }

  getUser = async user_id => {
    const response = await Axios.get(`/api/users/view/${user_id}`);
    this.setState({ user: { ...response.data }, loading: false });
  };

  edit = () => {
    this.setState({ edit: true });
  };

  handleTabChange = (event, value) => {
    this.setState({ page: value });
  };

  addFriend = async (status, user1, user2) => {
    this.setState({ disabled: true });
    await Axios.post(`/api/users/edit/friend`, {
      status: status,
      user1: user1,
      user2: user2
    });
    this.setState({ edit: true });
  };

  renderActionIcon = (status, currentUser, action_id, classes) => {
    const { disabled } = this.state;
    const { userId } = this.props.match.params;
    if (status === -1) {
      return (
        <Tooltip title="Add friend">
          <Fab
            color="primary"
            size="large"
            className={classes.add}
            disabled={disabled}
            onClick={() => {
              this.addFriend(0, currentUser.user_id, userId);
            }}
          >
            <PersonAddIcon />
          </Fab>
        </Tooltip>
      );
    } else if (status === 1) {
      return (
        <Tooltip title="Friends">
          <Fab color="primary" size="large" className={classes.add}>
            <PeopleIcon />
          </Fab>
        </Tooltip>
      );
    } else if (status === 0) {
      if (currentUser.user_id === action_id) {
        return (
          <Tooltip title="Friend request pending">
            <Fab color="primary" size="large" className={classes.add}>
              <PeopleOutlineIcon />
            </Fab>
          </Tooltip>
        );
      } else {
        return (
          <Tooltip title="Accept friend request">
            <Fab
              color="primary"
              size="large"
              className={classes.add}
              onClick={() => {
                this.addFriend(0, userId, currentUser.user_id);
              }}
            >
              <HowToRegIcon />
            </Fab>
          </Tooltip>
        );
      }
    }
  };

  render() {
    const { classes, theme } = this.props;
    const { user, page, loading } = this.state;
    return (
      <UserContext.Consumer>
        {({ currentUser }) => (
          <>
            <Navbar />
            {loading && (
              <LinearProgress
                color="primary"
                classes={{
                  root: classes.loading
                }}
              />
            )}
            <Cover user={user} currentUser={currentUser} edit={this.edit} />
            <Polaroid user={user} currentUser={currentUser} edit={this.edit} />
            <Grid container direction="row" className={classes.main}>
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={page}
                onChange={this.handleTabChange}
                style={{
                  marginBottom: 20
                }}
              >
                <Tab label="Thread" />
                <Tab label="Friends" />
                <Tab
                  label="My Info"
                  disabled={currentUser.user_id !== user.user_id}
                />
              </Tabs>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={page}
                onChangeIndex={index => this.setState({ page: index })}
              >
                <ThreadList user={user} />
                <FriendList user={user} />
                <UserInfo user={user} edit={this.edit} />
              </SwipeableViews>
              {currentUser !== null &&
                currentUser.user_id !== user.user_id &&
                this.renderActionIcon(
                  user.status,
                  currentUser,
                  user.action_id,
                  classes
                )}
            </Grid>
          </>
        )}
      </UserContext.Consumer>
    );
  }
}

const StyledProfile = injectSheet(styles)(Profile);

Profile.contextType = UserContext;

export default StyledProfile;
