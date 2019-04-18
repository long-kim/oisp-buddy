const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  username: String,
  time: Date,
  content: String
});

module.exports = mongoose.model("Message", messageSchema);
