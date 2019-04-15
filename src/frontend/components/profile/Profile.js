import React, { Component } from "react";
import * as styles from "./style.css"
// import image from "./images/Original image_ 1920x1200.jpg"

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "Sarah V",
            about: "I am a third year student majoring in CS. I love making new friends and learning new things.",
            avatar: "https://s22295.pcdn.co/wp-content/uploads/Avatar-couple.jpg",
            // cover: "http://gilbertford.com/news/wp-content/uploads/2012/07/inside-cover2.jpg",
            // cover: "https://source.unsplash.com/random",
            cover: "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.0-9/52373523_1938412499617544_6909351250995707904_o.jpg?_nc_cat=101&_nc_oc=AQkZ0RvqrA1orXKn7SC4QRDynCEblv53i48g6tVUE1N8RWFbYOtiVP0Ahs0plBHdNrs&_nc_ht=scontent.fdad3-2.fna&oh=b1ece9c4ef053c7cb92ffc0fd12c5d8d&oe=5D4F11B4",
            year: 2016,
            major: "Computer Science",
            friends: "",
            thread: "",
            achivement: ""
         }
        //  this.handdleButton=this.handdleButton.bind(this)
    }

    // componentDidMount() {
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then(response => response.json())
    //         .then(response => {
    //             const {memes} = response.data
    //             this.setState({ allMemeImgs: memes })
    //         })
    // }

    // handdleButton(){
    //     this.setState({
    //         cover: "https://source.unsplash.com/random"
    //     })
    // }

    render() {
        return ( 
            <div>
                <header className="header">

                    <img src = {this.state.cover}
                        alt = "user's cover" 
                    />
                    <h2 className = "user_name">
                        {this.state.name} <button type = "button" className = "title">PRO</button>
                    </h2>
                    <h6>
                        <button type = "button" onClick = {() => alert("UNAVAILABLE AT THE MOMENT")}>📷</button>
                    </h6>
                    <h5>
                        Class of {this.state.year} - {this.state.major}
                    </h5>
                    {/* <button 
                        type="button"
                        onClick = {()=> window.location.reload()}
                        // onClick = {this.handdleButton}
                        >Change the cover
                    </button> */}
                    <div class="polaroid">
                        <img src={this.state.avatar} alt="user's avatar" />
                        <div class="container">
                            <p>ABOUT <button type = "button" onClick = {() => alert("UNAVAILABLE AT THE MOMENT")}>✎</button></p>
                            <h6>{this.state.about} </h6> 
                            {/* <h7 className = "readmore">READ MORE →</h7> */}
                            <button type = "button" className = "readmore" onClick = {() => alert("That's it, I have nothing left to say")}>
                                Read more →
                            </button>
                            <hr/>
                        </div>
                    </div>
                
                </header>
                

            </div>
        );
    }
}
 
export default Profile;
