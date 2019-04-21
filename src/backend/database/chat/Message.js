const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userID: Number,
  time: Date,
  content: String
});

module.exports = mongoose.model("Message", messageSchema);
