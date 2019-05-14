import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Axios from "axios";
import * as styles from "./style.css";

class MiniAva extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ava: "",
      major: ""
    };
    this.handleClick = this.handleClick.bind();
  }
  componentDidMount() {
    Axios.get("/api/users/viewfriend", {
      params: {
        user_id: this.props.id
      }
    }).then(res => {
      this.setState({
        name: res.data[0].first_name + " " + res.data[0].last_name,
        ava: res.data[0].avatar,
        major: res.data[0].dept
      });
    });
  }
  handleClick = param => e => {
    return;
  };
  render() {
    let url;
    url = "/profile/friendlist/" + this.props.id.toString();
    return (
      <div style={{ width: "200px", margin: "0px" }}>
        {/* <img src={this.state.ava} alt="my avatar" />
        My id is: {this.props.id}
        <hr />
        My name is: {this.state.name} */}
        <Link
          to={{
            pathname: url,

            user_id: this.props.user_id
          }}
        >
          <label>
            <div className="card" style={{ margin: "0px" }}>
              <img
                src={this.state.ava}
                alt="Avatar"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
              <div className="containerr">
                <h4>
                  <b>{this.state.name}</b>
                </h4>
                <p>{this.state.major}</p>
              </div>
            </div>
          </label>
        </Link>
      </div>
    );
  }
}

export default MiniAva;
