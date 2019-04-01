let mongoose = require("mongoose");
let Thread = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 20,
      maxlength: 200,
      required: [true, "Title cannot be empty!"]
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      minlength: 50,
      required: [true, "Content cannot be empty!"]
    },
    score: {
      type: Number,
      default: 0
    },
    favorites: {
      type: Number,
      default: 0
    },
    url: {
      type: String
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply"
      }
		],
		reports: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Report"
			}
		]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thread", Thread);
