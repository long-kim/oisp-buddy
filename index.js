// Get .env variables
require("dotenv").config();

// Set up =====================================================================
const express = require("express");
const app = express();
const path = require("path");
const Sequelize = require("sequelize");
const passport = require("passport");
const port = process.env.PORT || 4000;

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

// For development
// const morgan = require("morgan");
// const flash = require("connect-flash");

// Configuration ==============================================================
// const sequelize = new Sequelize(process.env.DB_URI);
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql"
});
// const sequelize = new Sequelize({
//   database: "oisp-buddy",
//   username: "postgres",
//   password: "15081998",
//   host: "localhost",
//   dialect: "postgres"
// });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

require("./config/passport")(passport); // Passport configuration

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
  app.use(flash());
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up passport
app.use(
  cookieSession({
    secret: process.env.SESSION_KEY
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "static")));
app.use("/admin", express.static(path.join(__dirname, "admin/build")));
app.use("/", express.static(path.join(__dirname, "client/build")));

// Routes =====================================================================
app.use(require("./routes")(passport));
// Admin React HTML
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/admin/build/index.html"));
});
// Serve React HTML
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Launch =====================================================================
app.listen(port, () =>
  console.log(`Express server is running on port ${port}`)
);
