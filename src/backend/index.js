require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

express.static("backend/static");

const sequelize = new Sequelize({
  database: "oisp-buddy",
  username: "root",
  password: null,
  dialect: "mysql"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(require("./routes"));

app.listen(4000, () =>
  console.log("Express server is running on localhost:4000")
);
