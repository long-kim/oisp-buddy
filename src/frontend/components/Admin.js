import React, { Component } from "react";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = () => {
        let temp = this.state.number;
        this.setState({number: temp+1});
    }

    render() {
        return (
        <div>
            <h2>{this.state.number}</h2>
            <button type="button" onClick={this.handleClick}>Click me</button>
        </div>
        )
    }
}

export default Admin;