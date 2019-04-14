import React, { Component } from "react";
import * as styles from "./style.css"
// import image from "./images/Original image_ 1920x1200.jpg"

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            about: "",
            avatar: "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.0-9/12472234_799905163468289_8089281938658497720_n.jpg?_nc_cat=101&_nc_oc=AQktNpLiz_2p-Ws7wtgQISv-ecSJY5dSD54c3hD7yKu0-qZ5e83uGdTTx42PRU9Fkac&_nc_ht=scontent.fdad3-2.fna&oh=9123b33805a2d6d3d86d645518854d85&oe=5D296F81",
            // cover: "http://gilbertford.com/news/wp-content/uploads/2012/07/inside-cover2.jpg",
            // cover: "https://source.unsplash.com/random",
            cover: "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.0-9/52373523_1938412499617544_6909351250995707904_o.jpg?_nc_cat=101&_nc_oc=AQkZ0RvqrA1orXKn7SC4QRDynCEblv53i48g6tVUE1N8RWFbYOtiVP0Ahs0plBHdNrs&_nc_ht=scontent.fdad3-2.fna&oh=b1ece9c4ef053c7cb92ffc0fd12c5d8d&oe=5D4F11B4",
            year: "",
            major: "",
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
                    {/* <h1 className = "user_name">
                        Sarah V
                    </h1> */}
                    {/* <button 
                        type="button"
                        onClick = {()=> window.location.reload()}
                        // onClick = {this.handdleButton}
                        >Change the cover
                    </button> */}
                    <div class="polaroid">
                        <img src="http://gilbertford.com/news/wp-content/uploads/2012/07/inside-cover2.jpg" alt="Norway" />
                        <div class="container">
                            <p>ABOUT</p>
                        </div>
                    </div>

                </header>
                {/* <div className = "avatar">
                    <img src = {this.state.avatar} alt = "user's avatar"/>
                </div> */}

                {/* <body>
                    <p>
                        Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                        sdiofjoijflkamlkadnfkafnka Hello fsdfjdslk fjsdkf jsdof jsdoifjsd iofsdjfiosd jfsdiofj <br/>
                    </p>
                </body> */}
            </div>
        );
    }
}
 
export default Profile;
