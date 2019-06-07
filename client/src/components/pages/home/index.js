import React, { Component } from "react";
import injectSheet from "react-jss";

import Navbar from "./elements/Navbar";
import HomeSection from "./Home";
import AboutSection from "./About";

const styles = theme => ({
  homePage: {
    height: "fit-content",
    fontFamily: 'Georgia, "Times New Roman", Times, serif;'
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: undefined
    };
  }

  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "initial";
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Navbar />
        <div className={classes.homePage}>
          <HomeSection />
          <AboutSection />
        </div>
      </>
    );
  }
}

const StyledHome = injectSheet(styles)(Home);

export default StyledHome;
