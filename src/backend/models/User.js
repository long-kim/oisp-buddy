const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const salt_rounds = 10;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Cannot be blank"],
      match: [/^[^_.][a-zA-Z0-9]+$/, "Is invalid"],
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

/* Hash password */
UserSchema.pre("save", next => {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, salt_rounds, (err, hashed) => {
      if (err) {
        next(err);
      } else {
        document.password = hashed;
        next();
      }
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", UserSchema);
