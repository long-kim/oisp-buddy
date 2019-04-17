const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Cannot be blank"],
    // match: [/^[^_.][a-zA-Z0-9]+$/, "Is invalid"],
    index: true,
    minlength: 5,
    maxlength: 20
  },

  room: [
    {
      type: Number
    }
  ],

  userID: Number,
  fullName: String
});

module.exports = mongoose.model("User", UserSchema);
