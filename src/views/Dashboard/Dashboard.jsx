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
import Table from "components/Table/Table.jsx";
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
      total: undefined
    };
  }
  
  componentDidMount(){
    const httpClient = Axios.create()
    httpClient.defaults.timeout = 50000
    this.setState({
      id: this.props.match.params.user_id
    });

    // Axios.get("/api/users/getAll").then(res=>{
    //   this.setState({
    //     total: res.data.no_user
    //   })
    // })

    Axios.get("/api/users/viewfriend",{timeout: 5000}, {
      params: {
        user_id: this.props.match.params.user_id
      }
    }).then(res => {
      this.setState({
        fullname: res.data[0].first_name + " " + res.data[0].last_name,
        avatar: res.data[0].avatar,
        major: res.data[0].dept,
        cover: res.data[0].cover,
        about: res.data[0].about
      });
    });

    // Axios.get("/api/users/friendstatus", {
    //   params: {
    //     user_id1:
    //       this.props.match.params.user_id < this.state.idd
    //         ? this.props.match.params.user_id
    //         : this.state.idd,
    //     user_id2:
    //       this.props.match.params.user_id > this.state.idd
    //         ? this.props.match.params.user_id
    //         : this.state.idd
    //   }
    // }).then(res => {
    //   if (res.data == null) {
    //     Axios.post("/api/users/new/friend", {
    //       user1:
    //         this.props.match.params.user_id < this.state.idd
    //           ? this.props.match.params.user_id
    //           : this.state.idd,
    //       user2:
    //         this.props.match.params.user_id > this.state.idd
    //           ? this.props.match.params.user_id
    //           : this.state.idd,
    //       action: this.state.idd
    //     }).then(res => {
    //       this.setState({
    //         status: 0,
    //         action: this.state.idd
    //       });
    //     });
    //   } else {
    //     this.setState({
    //       status: res.data[0] ? res.data[0].status : null,
    //       action: res.data[0] ? res.data[0].action_user_id : 0,
    //       friendID: res.data[0] ? res.data[0].id : 0
    //     });
    //   }
    // });

    // Axios.get("/api/threads/threadlist", {
    //   params: {
    //     user: this.props.match.params.user_id
    //   }
    // }).then(res => {
    //   this.setState({
    //     threadd: res.data
    //   });
    // });
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
                  50
                </h3>
              </CardHeader>

              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                    Get more space
                  
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>Post</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Content</p>
                <h3 className={classes.cardTitle}>45 <small>posts</small></h3>
              </CardHeader>

              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>Issues</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Fixed Issues</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>

              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>Follower</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>+245</h3>
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
                  New members on 15th May, 2019
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["No", "Name", "Email", "Date"]}
                  tableData={[
                    ["1", "Kim Hoang Long", "kimhoanglong.cs@gmail.com", "2019-05-17 10:58:00"],
                    ["2", "Tran Duc Thinh", "jimcbl@gmail.com", "2019-05-17 10:58:00"],
                    ["3", "Vo Ngoc Quynh Nhu", "sarah@gmail.com", "2019-05-17 10:58:00"],
                    ["4", "Nguyen Phuc An", "anng96@gmail.com", "2019-05-17 10:58:00"]
                  ]}
                />
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
