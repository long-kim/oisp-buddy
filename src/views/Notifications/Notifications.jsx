/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

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

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false
    };
  }
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Notifications</h4>
          <p className={classes.cardCategoryWhite}>
            Handcrafted by our friends, mock-up for the project from{" "}
            <a target="_blank" href="https://xd.adobe.com/spec/25a61aa6-764d-47a4-5147-ae863e5798c1-5397/">
              Adobe XD
            </a>{" "}
            {/* and styled by {" "} */}
            {/* <a target="_blank" href="https://www.creative-tim.com/">Creative Tim </a> */}
            . Please checkout the{" "}
            <a href="https://github.com/long-kim/oisp-buddy" target="_blank">
              full documentation
            </a>
            .
          </p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h5>Documentation</h5>
              <br />
              <SnackbarContent message={<p><b>If you need to contact Computing Support, here's where to find us:</b><br></br>
              - The Support Office is in the B4 tower - room 405 <br></br>
              - Open Monday–Friday, 7.30 am–11.30 am and 1–5 pm <br></br>
              - Phone: 0123 257 2680 <br></br>
              - Email: 1652758@hcmut.edu.vn
              </p>}/>
              
              <SnackbarContent message={<p><b>Online:</b> <br></br>
              - Forum: https://oisp-buddy/ <br></br>
              - Message: https://www.facebook.com/longkim1508
                            </p>}/>

              <SnackbarContent message={<p><b>Frontline Support staff:</b><br></br>
              - Long Kim Hoang (Manager)<br></br>
              - Thinh Tran Duc (Procurement)<br></br>
              - An Nguyen Phuc (Procurement)<br></br>
              - Nhu Nguyen Ngoc Quynh (Procurement)
                            </p>}/>              
            
              
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h5>Color Table</h5>
              <br />
              <SnackbarContent
                message={
                  'INFO - This is a regular notification made with color="info"'
                }
                close
                color="info"
              />
              <SnackbarContent
                message={
                  'SUCCESS - This is a regular notification made with color="success"'
                }
                close
                color="success"
              />
              <SnackbarContent
                message={
                  'WARNING - This is a regular notification made with color="warning"'
                }
                close
                color="warning"
              />
              <SnackbarContent
                message={
                  'DANGER - This is a regular notification made with color="danger"'
                }
                close
                color="danger"
              />
              <SnackbarContent
                message={
                  'PRIMARY - This is a regular notification made with color="primary"'
                }
                close
                color="primary"
              />
            </GridItem>
          </GridContainer>
          <br />
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(styles)(Notifications);
