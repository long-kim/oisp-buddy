import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Moment from "react-moment";
import { Link, NavLink, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Axios from "axios";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


class TableList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: undefined,
      fullname: "",
      email: "",
      major: "",
      year: undefined,
      memberlist: [],
      thread: "",
      threadlist: [],
      deleteThread: false
    }
  }

  componentDidMount(){
    const httpClient = Axios.create()
    httpClient.defaults.timeout = 50000
    this.setState({
      id: this.props.match.params.user_id
    });

    Axios.get("/api/users/memberlist", {
      params: {
        user_id: this.state.id
      }
    }).then(res => {
      this.setState({
        memberlist: res.data
      });
    });

    Axios.get("/api/threads/threadlist", {
      params: {
        thread_id: this.state.id
      }
    }).then(res => {
      this.setState({
        threadlist: res.data
      });
    });

    // Axios.delete(`/api/threads/delete/${this.props.thread_id}`).then(res => {
    //   console.log(res);
    //   this.props.delete();
    //   document.getElementsByTagName("body")[0].style.overflow = "initial";
    // });

    let thread_id = this.props.match.params.threadId;
    Axios.get(
      `/api/threads/view/${thread_id}/page=${this.state.currentPage}`
    ).then(res => {
      const threads = res.data.threads;
      this.setState({ threads: threads, deleteThread: false });
    });
  }  

  _renderContent(){
    let url;
    return Object.keys(this.state.threadlist).map((obj, i) =>{
      url = "/forum/thread/" + this.state.threadlist[obj].author_id;
      return (
            <tr key = {i}>
              <th scope="row">{this.state.threadlist[obj].author_id}</th>
              <td>{this.state.threadlist[obj].title} </td>
              <td>
                  <Moment format="MMMM DD, YYYY" style={{ fontSize: "15px" }}>
                  {this.state.threadlist[obj].createdAt}
                  </Moment>
              </td>
              <td><div key={i}>
                    <Link to={url}>
                    <Button type="button" className="mr-lg-2 mb-2 mb-lg-0">
                      Go
                    </Button>
                  </Link>
                  </div>
              </td>
              <td><div key={i}>
                    <Button type="button" 
                            className="mr-lg-2 mb-2 mb-lg-0"
                            onClick={this.handleDeleteThread}>
                      Delete
                    </Button>
                  </div>
              </td>
            </tr>
      );
    })
  }

  handleDeleteThread = () => {
    this.setState({ deleteThread: true});
  };

  _renderObject(){
    let url;
    return Object.keys(this.state.memberlist).map((obj, i) =>{
      url = "/profile/" + this.state.memberlist[obj].user_id;
      return (
            <tr key = {i}>
              <th scope="row">{this.state.memberlist[obj].user_id}</th>
              <td>{this.state.memberlist[obj].first_name + " " + this.state.memberlist[obj].last_name}</td>
              <td>{this.state.memberlist[obj].email} </td>
              <td>{this.state.memberlist[obj].dept}</td>
              <td>{this.state.memberlist[obj].year}</td>
              <td>
                  <Moment format="MMMM DD, YYYY" style={{ fontSize: "15px" }}>
                  {this.state.memberlist[obj].createdAt}
                  </Moment>
              </td>
              <td><div key={i}>
                    <Link to={url}>
                    <Button type="button" className="mr-lg-2 mb-2 mb-lg-0">
                      Go
                    </Button>
                  </Link>
                  </div>
              </td>
            </tr>
      );
    })
  }

  

  render(){
  const { classes } = this.props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Thread Table</h4>
            <p className={classes.cardCategoryWhite}>
              All posts of all member in BUDDY web 
            </p>
          </CardHeader>
          <CardBody>
            <table class="table table-hover table-bordered">
                <thead class="thead-table-success">
                  <tr>
                    <th scope="col">Author ID</th>
                    <th scope="col">Content</th>
                    <th scope="col">Date</th>
                    <th scope="col">Review</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                {this._renderContent()}
                </tbody>
              </table> 
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Member</h4>
            <p className={classes.cardCategoryWhite}>
              Total number of people who follow and register this web
            </p>
          </CardHeader>
          <CardBody>
              <table class="table table-hover table-bordered">
                <thead class="thead-table-success">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Department</th>
                    <th scope="col">Year</th>
                    <th scope="col">Date</th>
                    <th scope="col">Review</th>
                  </tr>
                </thead>
                <tbody>
                {this._renderObject()}
                </tbody>
              </table> 
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
  }
  
}

export default withStyles(styles)(TableList);
