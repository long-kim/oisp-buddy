let mongoose = require("mongoose");

/* SCHEMA DEFINITION */
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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
      required: true
    },
    first_name: String,
    last_name: String,
    dept: String,
    year: Number,
    thread_subscribed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
      }
    ]
  },
  { timestamps: true }
);

/* METHODS */
User.methods.getID = function(cb) {
  return this.model("User").findOne({_id: this._id}).select("_id").exec(cb);
}

module.exports = mongoose.model("User", User);
