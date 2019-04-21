const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userID: Number,
  time: Date,
  content: String
});

const roomSchema = new mongoose.Schema({
  roomID: Number,

  messLength: {
    type: Number,
    default: 0
  },

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
