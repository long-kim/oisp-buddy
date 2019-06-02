import React, { Component } from 'react';
import logo from './hcmut.svg';
import './App.css';
import AutoCompleteText from './AutoCompleteText';
import name from './name';

class App extends Component {
  state = {
    response: '',
    post: '',
    reponseToPost: ''
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({response: res.express}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('api/get');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch('api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({post: this.state.post})
    });

    const body = await response.text();

    this.setState({reponseToPost: body});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo mb-3" alt="logo" />
          <p>
            OSIP Buddy Test Page
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
        <div className="App-Component">
            <h2>Search Bar:</h2>
              <AutoCompleteText items={name}/>
        </div>
        <form className="row d-flex form-group mt-3 test-api mx-auto justify-content-center" onSubmit={this.handleSubmit}>
          <h2>Post to Server:</h2>
          <div className="col-md-9">
            <input 
              type="text"
              className="form-control" 
              placeholder="Send to server"
              value={this.state.post}
              onChange={e => this.setState({post: e.target.value})}
            >
            </input>
          </div>
            <div className="col-md-3 mt-md-0 mt-3">
              <button 
                type="submit"
                className="btn btn-primary btn-block"
              >
                Submit
            </button>
          </div>
        </form>
        <div className="row d-flex mt-3 mx-auto response test-api justify-content-center">
          <div className={"alert alert-info " + (this.state.reponseToPost !== '' ? '' : 'd-none')} role="alert">
            {this.state.reponseToPost.split('\n').map((item, key) => {
              return <span key={key}>{item}<br></br></span>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
