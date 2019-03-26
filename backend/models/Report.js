let mongoose = require("mongoose");
let Report = new mongoose.Schema(
  {
    thread_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      required: true
    },
    reason: {
      type: String
    },
    response: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", Report);
