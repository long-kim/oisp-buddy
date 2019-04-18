const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  username: String,
  time: Date,
  content: String
});

const roomSchema = new mongoose.Schema({
  roomID: Number,

  participants: {
    type: [Number]
  },

  roomName: {
    type: "String",
    required: [true, "Cannot be blank"]
  },

  messages: {
    type: [messageSchema],
    default: []
  }
});

module.exports = mongoose.model("Room", roomSchema);
