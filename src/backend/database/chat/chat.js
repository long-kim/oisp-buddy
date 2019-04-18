const mongoose = require("mongoose");
const User = require("./User.js");
const Message = require("./Message.js");
const Room = require("./Room.js");
const faker = require("faker");
var moment = require("moment");

mongoose.connect("mongodb://localhost:27017/oisp-buddy", {
  useNewUrlParser: true
});

var db = mongoose.connection;

let userArray = ["katarina_will20", "mikayla_walter"];
for (let j = 1; j < 10; j++) {
  let randomUser = [j, j + 1];
  for (let i = 0; i < 15; i++) {
    let mess = Message({
      username: randomUser[Math.round(Math.random())],
      time: moment(),
      content: faker.lorem.sentence()
    });

    Room.findOneAndUpdate(
      { roomID: j },
      { $push: { messages: mess } },
      { new: true },
      function(err, doc) {
        if (err) {
          console.log("Something wrong when updating data!");
        }
      }
    );
  }
}

// Room.findOneAndUpdate({ roomID: 0 }, { messages: [] }, { new: true }, function(
//   err,
//   doc
// ) {
//   if (err) {
//     console.log("Something wrong when updating data!");
//   }
// });
// Room0.save(function(err) {
//   if (err) return handleError(err);
//   console.log("Success!");
// });

// for (let i = 0; i < 10; i++) {
//   let room = new Room({
//     roomID: i,
//     roomName: faker.lorem.words(),
//     participants: [i, i + 1]
//   });
//   room.save(function(err, data) {
//     if (err) return console.error(err);
//   });
// }
