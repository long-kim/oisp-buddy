require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_LOCAL);

/**
 * DATABASE CONNECTION
 */
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error!"));
db.once("open", function() {
  console.log(`Connected to database: OISP-Buddy`);
});

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.get("/api/get", (_req, res) => {
  res.send({
    express: "Hello From Server"
  });
});

app.post("/api/post", (req, res) => {
  console.log(req.body);
  res.send(`I received your message. Is this what you sent?\n${req.body.post}`);
});

app.listen(4000, () =>
  console.log("Express server is running on localhost:4000")
);
