import React, { Component } from "react";
import MessageList from "./MessageList";
import firebase from "firebase";
import FormInput from "./FormInput";
import firebaseConfig from "./Config";
import { Button } from "react-bootstrap";

firebase.initializeApp(firebaseConfig);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      roomlist: []
    };

    this.fireStoreRef = firebase.firestore();
    this.userRef = this.fireStoreRef.collection("user");
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
    {
      this.userRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      });
    }
    return (
      <div>
        {!this.state.user ? (
          <Button variant="primary" onClick={this.handleSignIn.bind(this)}>
            {" "}
            Sign in
          </Button>
        ) : (
          <div>
            <h5>Hello {this.state.user.displayName}</h5>
            <img src={this.state.user.photoURL} height="100" width="100" />
            <Button variant="secondary" onClick={this.handleLogOut.bind(this)}>
              {" "}
              Log out
            </Button>
          </div>
        )}
        {/* <MessageList user={this.state.user} />
        <FormInput user={this.state.user} /> */}
      </div>
    );
  }
}

export default Chat;
