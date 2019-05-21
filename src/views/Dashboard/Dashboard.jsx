import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general.jsx";
import Axios from "axios";
import Moment from "react-moment";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      id: undefined,
      avatar: "",
      cover: "",
      fullname: "",
      year: undefined,
      major: "",
      about: "",
      status: undefined,
      action: undefined,
      idd: localStorage.getItem("id"),
      friendID: undefined,
      threadd: [], 
      totalMember: undefined,
      totalThread: undefined,
      totalPost: undefined,
      totalDept: undefined,
      memberlist: []
    };
  }
  
  componentDidMount(){
    const httpClient = Axios.create()
    httpClient.defaults.timeout = 50000
    this.setState({
      id: this.props.match.params.user_id
    });

    Axios.get("/api/users/getAllMember").then(res=>{
      this.setState({
        totalMember: Object.keys(res.data).length
      })
    });

    Axios.get("/api/threads/getAllThread").then(res=>{
      this.setState({
        totalThread: Object.keys(res.data).length
      })
    });

    Axios.get("/api/posts/getAllPost").then(res=>{
      this.setState({
        totalPost: Object.keys(res.data).length
      })
    });

    Axios.get("/api/users/getAllMember").then(res=>{
      this.setState({
        totalDept: Object.keys(res.data).length
      })
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
  }

  _renderObject(){
    return Object.keys(this.state.memberlist).map((obj, i) =>{
      return (
            <tr key = {i}>
              <th scope="row">{this.state.memberlist[obj].user_id}</th>
              <td>{this.state.memberlist[obj].first_name + " " + this.state.memberlist[obj].last_name}</td>
              <td>{this.state.memberlist[obj].email} </td>
              <td>
                  <Moment format="MMMM DD, YYYY" style={{ fontSize: "15px" }}>
                  {this.state.memberlist[obj].createdAt}
                  </Moment>
              </td>
            </tr>
      );
    })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>Member</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>People</p>
                <h3 className={classes.cardTitle}>
                  {this.state.totalMember}
                </h3>
              </CardHeader>

              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                    Total member in our website 
                  
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>Thread</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Topic</p>
                <h3 className={classes.cardTitle}>
                    {this.state.totalThread? this.state.totalThread : "no thread"}
                   </h3>
              </CardHeader>

              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Total thread in all
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>Post</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Content</p>
                <h3 className={classes.cardTitle}>
                  {this.state.totalPost}
                </h3>
              </CardHeader>

              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Total post in all
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>Depart</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Department</p>
                <h3 className={classes.cardTitle}>
                  {this.state.totalDept}
                </h3>
              </CardHeader>

              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>


        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Lastest member</h4>
                <p className={classes.cardCategoryWhite}>
                  New members on lastest time
                </p>
              </CardHeader>
              <CardBody >
                <div >
              <table class="table table-striped table-bordered mb-0">
                <thead class="thead-table-success">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody  height="200">
                {this._renderObject()}
                </tbody>
              </table>  
              </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
