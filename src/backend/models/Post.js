const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const PostSchema = new mongoose.Schema({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
        required: true
    },
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        minlength: 20,
        required: true
    },
    score: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

PostSchema.plugin(AutoIncrement, {
    inc_field: 'post_id'
})

module.exports = mongoose.model("Post", PostSchema);