const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("backend/database/chat/User.js");
const Room = require("backend/database/chat/Room.js");
const Message = require("backend/database/chat/Message.js");
const moment = require("moment");

router.get("/", (req, res) => {
  res.json("Hello Chat API");
});

router.get("/users/:userID", (req, res) => {
  //   res.json("Chat room api");
  User.findOne({ userID: req.params.userID }, function(err, room) {
    if (err) return console.error(err);
  }).then(doc => {
    res.json(doc.room);
  });
});

router.get("/rooms/:roomID", (req, res) => {
  //   res.json("Chat room api");
  Room.findOne({ roomID: req.params.roomID }, function(err, room) {
    if (err) return console.error(err);
  })
    .select("roomName")
    .then(doc => {
      res.json(doc);
    });
});

// router.get("/rooms/:roomID/participants", (req, res) => {
//   //   res.json("Chat room api");

//   var dict = [],
//     temp = [];
//   Room.findOne({ roomID: req.params.roomID }, function(err, room) {
//     if (err) return console.error(err);
//   })
//     .then(doc => {
//       temp = doc.participants;
//     })
//     .then(_ => {
//       temp.forEach(element => {
//         User.findOne({ userID: element }, function(err, data) {
//           if (err) return console.error(err);
//         }).then(doc => {
//           dict.push({ key: element, value: doc.username });
//           // console.log(dict);
//         });
//       });
//     });
// });

router.get("/rooms/:roomID/participants", (req, res) => {
  Room.findOne({ roomID: req.params.roomID }, function(err, room) {
    if (err) return console.error(err);
  }).then(doc => {
    res.json(doc.participants);
  });
});

router.get("/rooms/:roomID/messages", (req, res) => {
  Room.findOne({ roomID: req.params.roomID }, function(err, room) {
    if (err) return console.error(err);
  })
    .slice("messages", -5) // Only get 7 lastest messages
    .then(room => {
      res.json(room.messages);
    });
});

router.get("/rooms/:roomID/messagesMore/:index/", (req, res) => {
  Room.findOne({ roomID: req.params.roomID }, function(err, room) {
    if (err) return console.error(err);
  })
    .slice("messages", [res.params.index, 5]) // Only get 7 lastest messages
    .then(room => {
      res.json(room.messages);
    });
});

router.get("/rooms/:roomID/last", (req, res) => {
  Room.findOne({ roomID: req.params.roomID }, function(err, room) {
    if (err) return console.error(err);
  }).then(room => {
    res.json(room.messages[room.messages.length - 1]);
  });
});

router.post("/rooms/:roomID/post", (req, res) => {
  // console.log("Api return: ", req.body);
  let mess = Message({
    userID: req.body.userID,
    time: moment(),
    content: req.body.content
  });
  Room.findOneAndUpdate(
    { roomID: req.params.roomID },
    { $push: { messages: mess }, $inc: { messLength: 1 } },
    { new: true },
    function(err, doc) {
      if (err) {
        console.error(err);
      }
    }
  );
});

// });

module.exports = router;
