// Get .env variables
require("dotenv").config();

// Set up =====================================================================
const express = require("express");
const app = express();
const path = require("path");
const Sequelize = require("sequelize");
const passport = require("passport");
const flash = require("connect-flash");
const port = process.env.SERVER_PORT || 4000;

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const http = require("http");
const socketio = require("socket.io");
const passportSocketIo = require("passport.socketio");
const server = http.Server(app);
const io = socketio(server);

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
  cookieSession({
    secret: process.env.SESSION_KEY,
    maxAge: 24 * 60 * 60 * 1000
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
// Socket
io.use(
  passportSocketIo.authorize({
    key: "connect.sid",
    secret: process.env.SESSION_KEY,
    passport: passport,
    cookieParser: cookieParser
  })
);
// let interval;
// io.on("connection", socket => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 10000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

io.on("connection", client => {
  client.on("message", handleMessage);
  client.on("chatrooms", handleGetChatrooms);
  client.on("availableUsers", handleGetAvailableUsers);
  client.on("disconnect", function() {
    console.log("client disconnect...", client.id);
    handleDisconnect();
  });

  client.on("error", function(err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });
});

io.listen(8000);

// Routes =====================================================================
app.use(require("./routes")(passport));

// Launch =====================================================================
app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);
