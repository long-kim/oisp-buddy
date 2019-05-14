import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
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

function TableList(props) {
  const { classes } = props;
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
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Content", "Date", "Vote"]}
              tableData={[
                ["Ly Hung Duy", 
                "Quis quo pariatur. Omnis tempora aut aut ipsa. Rem ut ipsum omnis minima tempore commodi est provident. ",
                "Yesterday 13th May, 2019", "3"],
                ["Vo Ngoc Quynh Nhu", 
                "Nam reprehenderit dolores. Voluptatem quasi ut qui quos sed eos quasi. Et molestias maxime aut ut.", 
                "9th May, 2019", "7"],
                ["Kim Hoàng Long", 
                "Adipisci a ducimus molestias illum iure non et. Ut ut non id totam.", 
                "24th April, 2019", "11"],
                ["Nguyen Phuc An", 
                "Exercitationem voluptates tempore ad est. Veritatis perferendis cum accusantium facilis atque.", 
                "20th April, 2019", "8"],
                ["Tran Duc Thinh", 
                "Ex suscipit aut minus nobis rerum. Iure et ipsum nostrum fuga. Recusandae ipsam magni quos labore quae sit hic.", 
                "3rd April, 2019", "6"],
                ["Kim Hoàng Long", 
                "Et nam quisquam eaque laboriosam aperiam consequuntur.", 
                "20th March, 2019", "20"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Member
            </h4>
            <p className={classes.cardCategoryWhite}>
              Total number of people who follow and register this web
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Email", "Phone", "City"]}
              tableData={[
                ["1", "Nguyen Phuc An", "1552005@hcmut.edu.vn", "0908041044", "Vietnam"],
                ["2", "Kim Hoàng Long", "1652758@hcmut.edu.vn", "0912756238", "America"],
                ["3", "Tran Duc Thinh", "1652578@hcmut.edu.vn", "0939304193", "Japan"],
                ["4", "Vo Ngoc Quynh Nhu", "1652458@hcmut.edu.vn", "0126432014", "Korea"],
                ["5", "Ly Hung Duy", "1652099@hcmut.edu.vn", "0126324982", "Russia"],
                ["6", "Nguyen Ngoc Ngan", "1552050@hcmut.edu.vn", "0907302142", "Thailand"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(TableList);
