import React, { Component } from "react";
import * as styles from "./style.css";
import { Link, NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Calendar from 'react-calendar';
import Friend from "./Friend"
import Info from "./Info"
//import Calendar from 'react-calendar/dist/entry.nostyle';
import Axios from "axios";
const jwt = require("jsonwebtoken");


class Profile extends Component {
    static Friend = Friend;
    static Info = Info;
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            about: "",
            avatar: "",
            cover: "",
            year: undefined,
            major: "",
            friends: "0",
            thread: "0",
            achivement: "0",
            toggle: false,
            // idd: localStorage.getItem("id"),
            // id: localStorage.getItem("oisp-token") ,// lay id tu token
            test:""
        }
         this.handleButton=this.handleButton.bind(this)
    }
    //test
    componentDidMount() {
        // const user_id = jwt.decode(this.state.id).id;
        // console.log("test: "+user_id);
        // data
        Axios.get(`/api/users/view`).then(res => {

          this.setState({
            name: res.data.first_name+" "+ res.data.last_name,
            year: res.data.year,
            major: res.data.dept,
            avatar: res.data.avatar,
            cover: res.data.cover,
            about: res.data.about,
          });
        });
        
      }

    handleButton(){
        
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle
            }
        })
    }

    render() {
        
        return ( 
            <div>
                {
                    localStorage.getItem("oisp-token") == null? 
                        <Link to = "/login">
                            <Button type = "button" className="mr-lg-2 mb-2 mb-lg-0">
                                Click here to log in first
                            </Button>
                        </Link>

                    :

                    <div>
                    <header className="header">
                        
                    <img src = {this.state.cover}
                        alt = "user's cover" 
                    />
                    <h6>
                        <button type = "button" onClick = {() => alert("UNAVAILABLE AT THE MOMENT")}><i class="fas fa-pencil-alt"></i></button>
                    </h6>
                    <h2 className = "user_name">
                            {this.state.name} <br/>
                            <h6>Class of {this.state.year} - {this.state.major}</h6>

                    </h2>
                    
                    
                    <div class="polaroid">
                        <img src={this.state.avatar} alt="user's avatar" />
                        <div class="container">
                            <p>ABOUT  <button type = "button" onClick = {() => alert("UNAVAILABLE AT THE MOMENT")}><i class="fas fa-pencil-alt"></i></button></p>
                            <h6>{this.state.about} </h6> 
                            <div className = "readmore">
                                <Link to = "profile/info">
                                    <button type = "button" className = "readmore">
                                        Read more → 
                                    </button>
                                </Link>
                            </div>    
                            <hr/>
                            <p className = "info">
                                <h7 style = {{float:"left"}}><Link to ="profile/friend">FRIEND</Link></h7> <h7 style = {{float:"right"}}>{this.state.friends}</h7> <br/>
                                <h7 style = {{float:"left"}}><Link to ="forum">THREAD</Link></h7> <h7 style = {{float:"right"}}>{this.state.thread}</h7> <br/>
                                <h7 style = {{float:"left"}}>ACHIVEMENT</h7> <h7 style = {{float:"right"}}>{this.state.achivement}</h7><br/>
                            </p>
                        </div>
                    </div>
                
                </header>

                <div className = "calendar">
                <Button variant="contained" onClick = {this.handleButton}>
                    {this.state.toggle? "Close Calendar" : "Open Calendar"}
                </Button> {this.state.toggle ? <Calendar onClickDay={()=>alert("nothing yet")}/> : null} 
                {this.state.id == null? "not log in" :this.state.test}
                </div>
                </div>
                }
            

            </div>
        );
    }
}
 
export default Profile;
