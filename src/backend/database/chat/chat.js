const mongoose = require("mongoose");
const User = require("./User.js");
const Room = require("./Room.js");
const faker = require("faker");

mongoose.connect("mongodb://localhost:27017/oisp-buddy", {
  useNewUrlParser: true
});

var db = mongoose.connection;

for (let i = 0; i < 11; i++) {
  if (i === 0) {
    var user = new User({
      username: faker.internet.userName(),
      userID: i,
      room: [0]
    });
  } else if (i === 10) {
    var user = new User({
      username: faker.internet.userName(),
      userID: i,
      room: [9]
    });
  } else {
    var user = new User({
      username: faker.internet.userName(),
      userID: i,
      room: [i - 1, i]
    });
  }
  user.save(function(err, data) {
    if (err) return console.error(err);
  });
}

// let room = new Room({
//   roomID: i,
//   participants: [i, i + 1],
//   roomName: faker.lorem.words()
// });
// room.save((err, data) => {
//   if (err) return console.err(err);
// });
