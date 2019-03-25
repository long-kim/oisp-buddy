let mongoose = require("mongoose");
let Comment = new mongoose.Schema(
  {
		parent_id: {
			type: mongoose.Schema.Types.ObjectId
		},
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      minlength: 20,
      required: [true, "Content cannot be empty!"]
    },
    score: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", Comment);