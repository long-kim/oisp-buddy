import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/common/Navbar";

class App extends Component {
  state = {
    currentPage: "home"
  };

  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;
