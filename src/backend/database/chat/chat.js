const mongoose = require("mongoose");
const User = require("./User.js");
const Message = require("./Message.js");
const Room = require("./Room.js");
const faker = require("faker");
var moment = require("moment");

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

mongoose.connect("mongodb://localhost:27017/oisp-buddy", {
  useNewUrlParser: true,
  useCreateIndex: true
});

var db = mongoose.connection;

// for (let j = 0; j < 10; j++) {
//   let room = new Room({
//     roomID: j,
//     roomName: toTitleCase(faker.lorem.words()),
//     participants: [j, j + 1]
//   });
//   room.save(function(err, data) {
//     if (err) return console.error(err);
//   });
// }

for (let j = 0; j < 10; j++) {
  let randomUser = [j, j + 1];
  for (let i = 0; i < 15; i++) {
    let mess = Message({
      userID: randomUser[Math.round(Math.random())],
      time: moment(),
      content: faker.lorem.sentence()
    });
    Room.findOneAndUpdate(
      { roomID: j },
      { $push: { messages: mess }, $inc: { messLength: 1 } },
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
