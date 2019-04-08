// Get .env variables
require("dotenv").config();

// Set up =====================================================================
const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const passport = require("passport");
const flash = require("connect-flash");
const port = process.env.SERVER_PORT || 4000;

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

// Configuration ==============================================================
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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

require("./config/passport")(passport); // Passport configuration

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up passport
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes =====================================================================
app.use(require("./routes")(passport));

// Launch =====================================================================
app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);
