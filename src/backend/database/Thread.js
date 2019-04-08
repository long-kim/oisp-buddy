const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 20,
    maxlength: 200,
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  favorites: {
    type: Number,
    default: 0
  },
  permalink: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  }],
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report"
  }]
}, {
  timestamps: true
});

ThreadSchema.plugin(AutoIncrement, {
  inc_field: 'thread_id'
});

ThreadSchema.methods.vote = val => {
  this.score += val;
  return this.save()
}

ThreadSchema.methods.add_post = post => {
  this.posts.push(post)
  return this.save()
}

ThreadSchema.methods.get_by_user = _id => {
  const Thread = mongoose.model("Thread", ThreadSchema);
  Thread.find({
    author_id: _id
  }).then(threads => {
    return threads;
  })
}

module.exports = mongoose.model("Thread", ThreadSchema);