import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div className="row d-flex form-group mt-3 test-api mx-auto justify-content-center">
          <h2>Post to Server:</h2>
          <div className="col-md-9">
            <input type="text" className="form-control" placeholder="Send to server"></input>
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
