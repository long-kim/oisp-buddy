import React, { Component } from "react";
import $ from "jquery";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
require("jquery-ui/ui/effect");
class Home extends Component {
  state = {
    loggedIn: false,
    user: undefined
  };

  componentDidMount() {
    if (!_.isUndefined(localStorage.getItem("oisp-token"))) {
      this.setState({
        loggedIn: true,
        user: JSON.parse(localStorage.getItem("user"))
      });
    }
    $("body").css({
      overflow: "hidden"
    });
    $(".nav-link").click(function() {
      var sectionTo = $(this).attr("href");
      $("html, body").animate(
        {
          scrollTop: $(sectionTo).offset().top
        },
        1000,
        "easeOutExpo"
      );
    });
  }

  componentWillUnmount() {
    $("body").css({
      overflow: "initial"
    });
  }

  render() {
    return (
      <div className="Home">
        <section id="home">
          <div className="intro">
            <div className="content">
              <h1>OISP Buddy</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </p>
            </div>
            {this.state.loggedIn && (
              <div className="action logged-in">
                <Link to="/forum/index">
                  <Button as="button" variant="primary" className="long-btn">
                    Go to Forums
                  </Button>
                </Link>
                <span>
                  Logged in as <b>{this.state.user.username}</b>
                  <span className="sign-out">Sign out</span>
                </span>
              </div>
            )}
            {!this.state.loggedIn && (
              <div className="action">
                <Button as="button" variant="light">
                  Login
                </Button>
                <Button as="button" variant="primary">
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </section>
        <section id="about">
          <h1>About us</h1>
          <p>The team behind OISP Buddy</p>
          <div className="authors">
            <div className="author">
              <div className="avatar">
                <img
                  src="/images/avatars/avatar_long.jpg"
                  alt="Long's Avatar"
                />
              </div>
              <div className="author-desc">
                <h4>Long Kim</h4>
                <span>Co-Founder - Chief Technology Officer</span>
              </div>
            </div>
            <div className="author">
              <div className="avatar">
                <img src="/images/avatars/avatar_nhu.jpg" alt="Nhu's Avatar" />
              </div>
              <div className="author-desc">
                <h4>Vo Ngoc Quynh Nhu</h4>
                <span>Chief Operating Officer</span>
              </div>
            </div>
            <div className="author">
              <div className="avatar">
                <img src="/images/avatars/avatar_jim.jpg" alt="Jim's Avatar" />
              </div>
              <div className="author-desc">
                <h4>Tran Duc Thinh</h4>
                <span>Co-Founder - Chief Executive Officer </span>
              </div>
            </div>
            <div className="author">
              <div className="avatar">
                <img src="/images/avatars/avatar_an.jpg" alt="An's Avatar" />
              </div>
              <div className="author-desc">
                <h4>Nguyen Phuc An</h4>
                <span>Chief Financial Officer</span>
              </div>
            </div>
            <div className="author">
              <div className="avatar">
                <img
                  src="/images/avatars/avatar-default.svg"
                  alt="Duy's Avatar"
                />
              </div>
              <div className="author-desc">
                <h4>Ly Hung Duy</h4>
                <span>Chief Reputation Officer</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
