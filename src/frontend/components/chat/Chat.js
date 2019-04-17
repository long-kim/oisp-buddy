import React, { Component } from "react";
import MessageList from "./MessageList";
import { db } from "./firebase";
import FormInput from "./FormInput";
import RoomList from "./RoomList";
import { Button } from "react-bootstrap";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      roomlist: [],
      roomID: 1000
    };
  }

  componentDidMount() {
    db.collection("users")
      .doc("jimcbl")
      .get()
      .then(doc => {
        this.setState({
          user: doc.data().username,
          roomlist: doc.data().rooms
        });
      });
  }

  // handleSignIn() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider);
  // }
  // handleLogOut() {
  //   firebase.auth().signOut();
  // }

  render() {
    return (
      <div>
        {/* {!this.state.user ? (
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
        )} */}
        <h1>Hello {this.state.user} </h1>
        {/* <RoomList roomlist={this.state.roomlist} /> */}
        <MessageList user={this.state.user} roomID={this.state.roomID} />
      </div>
    );
  }
}

export default Chat;
