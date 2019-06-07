// Import the Firebase modules that you need in your app.
import firebase from "@firebase/app";
import "@firebase/firestore";

// Initalize and export Firebase.

const config = {
  apiKey: "AIzaSyCs5G_6JfFFm9OLKdDxu6INTxnH47qOsw4",
  authDomain: "buddy-chat-dec35.firebaseapp.com",
  databaseURL: "https://buddy-chat-dec35.firebaseio.com",
  projectId: "buddy-chat-dec35",
  storageBucket: "buddy-chat-dec35.appspot.com",
  messagingSenderId: "876292294026",
  appId: "1:876292294026:web:ba4c22677a954362"
};

export default firebase.initializeApp(config);
