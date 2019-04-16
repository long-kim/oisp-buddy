import React, { Component } from "react";
import MessageList from "./MessageList";
import firebase from "firebase";
import FormInput from "./FormInput";
import firebaseConfig from "./Config";

import { Button } from "react-bootstrap";

firebase.initializeApp(firebaseConfig);

// function GuestGreeting(props) {
//   return <h3>Please sign in</h3>;
// }

// function UserGreeting(props) {
//   return <h3>Welcome back!</h3>;
// }

// function Greeting(props) {
//   const isLoggedIn = props.isLoggedIn;
//   if (!isLoggedIn) {
//     return <UserGreeting />;
//   }
//   return <GuestGreeting />;
// }

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  handleLogOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        {!this.state.user ? (
          <Button variant="primary" onClick={this.handleSignIn.bind(this)}>
            {" "}
            Sign in
          </Button>
        ) : (
          <div>
            {/* <h5>Hello {this.state.user.displayName}</h5>
            <img src={this.state.user.photoURL} height="100" width="100" /> */}
            <Button variant="secondary" onClick={this.handleLogOut.bind(this)}>
              {" "}
              Log out
            </Button>
          </div>
        )}
        <MessageList user={this.state.user} />
        <FormInput user={this.state.user} />
      </div>
    );
  }
}

export default Chat;
