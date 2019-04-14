const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

const salt_rounds = 10;

const UserSchema = new mongoose.Schema({
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
  userInfo: {
    type: String,
    maxlength: 250
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
    default: "user",
    required: true
  },
  first_name: String,
  last_name: String,
  dept: String,
  year: Number,
  thread_subscribed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread"
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
  timestamps: true
});

/* Hash password */
UserSchema.pre("save", function(next) {
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

UserSchema.plugin(AutoIncrement, {
  inc_field: 'user_id'
});

UserSchema.methods.add_friend = user_id => {
  this.friends.push(user_id)
  return this.save()
}

UserSchema.methods.remove_friend = user_id => {
  if (this.friends.indexOf(user_id) !== -1) {
    const new_arr = this.friends.filter(id => id !== user_id);
    this.friends = new_arr
    return this.save()
  }
}

UserSchema.methods.subscribe = thread_id => {
  this.thread_subscribed.push(thread_id);
}

UserSchema.methods.unsubscribe = thread_id => {
  if (this.thread_subscribed.indexOf(thread_id) !== -1) {
    const new_arr = this.thread_subscribed.filter(id => id !== thread_id);
    this.thread_subscribed = new_arr
    return this.save()
  }
}

module.exports = mongoose.model("User", UserSchema);