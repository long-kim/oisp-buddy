import React, { Component } from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

import defaultAvatar from "../../../assets/images/avatar-default.svg";

const styles = theme => ({
  root: {
    width: 200,
    height: "fit-content",
    transition: [["box-shadow", "0.2s"]],
    margin: 20,
    flexShrink: 0,
    height: 300
  },
  media: {
    height: 200
  },
  content: {
    height: 100
  }
});

class FriendItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  render() {
    const { friend, classes } = this.props;
    const { hover } = this.state;
    return (
      <Card
        className={classes.root}
        raised={hover}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <CardActionArea component={Link} to={`/profile/${friend.user_id}`}>
          <CardMedia className={classes.media} image={friend.avatar !== "" ? friend.avatar : defaultAvatar} />
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h6">
              {friend.name}
            </Typography>
            <Typography component="h6" variant="caption">
              {friend.dept}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

const StyledFriendItem = injectSheet(styles)(FriendItem);

export default StyledFriendItem;
