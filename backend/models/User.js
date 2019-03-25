let mongoose = require("mongoose");
let User = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "Cannot be blank"],
      match: [
        /^[^_.][a-zA-Z0-9]+$/,
        "Is invalid"
      ],
      index: true,
      minlength: 6,
      maxlength: 20
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Cannot be blank"],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Is invalid"
      ],
      index: true
    },
    password: String,
    fname: String,
    lname: String,
    dept: String,
    year: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
