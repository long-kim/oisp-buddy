const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("backend/database/chat/User.js");
const Room = require("backend/database/chat/Room.js");

router.get("/", (req, res) => {
  res.json("Hello Chat API");
});

router.get("/users/:userID", (req, res) => {
  //   res.json("Chat room api");
  User.find({ userID: req.params.userID }, function(err, room) {
    if (err) return console.error(err);
  }).then(doc => {
    res.json(doc[0].room);
  });
});

router.get("/rooms/:roomID", (req, res) => {
  //   res.json("Chat room api");
  Room.find({ roomID: req.params.roomID }, function(err, room) {
    if (err) return console.error(err);
  }).then(doc => {
    res.json(doc[0]);
  });
});

router.get("/rooms/:roomID/participants", (req, res) => {
  //   res.json("Chat room api");
  Room.find({ roomID: req.params.roomID }, function(err, room) {
    if (err) return console.error(err);
  }).then(doc => {
    res.json(doc[0].participants);
  });
});

module.exports = router;
