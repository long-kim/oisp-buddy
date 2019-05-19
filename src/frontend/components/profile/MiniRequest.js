import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class MiniRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      avatar: "",
      id: this.props.action_user_id ? this.props.action_user_id : "no one"
    };
  }

  componentDidMount() {
    Axios.get("/api/users/viewfriend", {
      params: {
        user_id: this.state.id
      }
    }).then(res => {
      this.setState({
        fullname: res.data[0].first_name + " " + res.data[0].last_name,
        avatar: res.data[0].avatar
      });
    });
  }

  render() {
    return (
      <div>
        <hr style={{ marginTop: "0%", marginBottom: "5px" }} />
        <Link to={this.props.url}>
          <div className="media" style={{ paddingLeft: "10px" }}>
            <div className="media-left media-middle">
              <img
                src={this.state.avatar}
                style={{
                  width: "30px",
                  height: "30px",
                  objectFit: "cover",
                  borderRadius: "50%"
                }}
              />
            </div>
            <div className="media-body" style={{ paddingLeft: "10px" }}>
              <h4 style={{ fontSize: "15px" }}>{this.state.fullname}</h4>
            </div>
          </div>
        </Link>
        <hr style={{ marginTop: "5px", marginBottom: "0px" }} />
      </div>
    );
  }
}

export default MiniRequest;
